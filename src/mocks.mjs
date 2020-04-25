import fs from 'fs';
import request from 'request';
import md5File from 'md5-file';
import { properties } from './utils/properties';
import { logger } from './utils/logger';

const mocksFolder = properties.get('mocks-path') ? properties.get('mocks-path') : process.cwd() + '/mocks/';
const hashes = [];
let isProcessing = false;

function run() {
    checkServerStatus()
        .then(() => setInterval(createMocks, properties.get('watch-delay')))
        .catch(() => process.exit())
}

function checkServerStatus() {
    return new Promise((resolve, reject) => {
        request.get(`http://${properties.get('host')}:${properties.get('port')}/__admin/requests/`)
            .on('error', () => {
                logger.error('Server déconnecté.');
                reject();
            })
            .on('data', () => {
                logger.info('Server connecté.');
                resolve();
            });
    });
}

function createMocks() {

    if(isProcessing) {
        return;
    }

    fs.readdir(mocksFolder, (err, files) => {
        if (!files) {
            logger.error('Dossier mocks invalide, arrêt du processus.');
            process.exit();
        }

        let filesToProcess = files;

        files.forEach(file => {

            const hash = md5File.sync(mocksFolder + '/' + file);


            fs.readFile(mocksFolder + '/' + file, 'utf8', (err, data) => {
                if (err) {
                    throw new Error(JSON.stringify(err))
                }

                data = setCorsHeaders(data);

                const option = {
                    uri: `http://${properties.get('host')}:${properties.get('port')}/__admin/mappings/new`,
                    body: data,
                    method: 'POST'
                };

                request(option)
                    .on('error', () => {
                        logger.warn('Le server s\'est déconnecté, arrêt du processus...');
                        process.exit();
                    })
                    .on('response', (res) => {

                        if (!hashes.includes(hash)) {
                            hashes.push(hash)
                        } else {
                            return;
                        }

                        if (res.statusCode >= 200 && res.statusCode < 400) {
                            logger.info(`Mock ${file} créé.`);
                        } else {
                            logger.error(`Mock ${file} non créé.`);
                        }

                        filesToProcess = removeProcessedFile(filesToProcess, file);
                        isProcessing = filesToProcess.length > 0;
                    });
            });
        });
    });
}

function setCorsHeaders(data) {

    const number = data.indexOf('"status": ');

    const headers = '"headers":\n' +
        '    {\n' +
        '      "Content-Type" : "application/json",\n' +
        '      "Access-Control-Allow-Origin" : "*",\n' +
        '      "Access-Control-Allow-Methods" : "*",\n' +
        '      "Access-Control-Allow-Headers": "*",\n' +
        '      "X-Content-Type-Options" : "nosniff",\n' +
        '      "x-frame-options" : "DENY",\n' +
        '      "x-xss-protection" : "1; mode=block"\n' +
        '    },'

    data = data.slice(0, number + '"status": '.length + 4) + headers + data.slice(number + '"status": '.length + 4);

    return data;
}

function removeProcessedFile(files, file) {
    const index = files.indexOf(file);
    if (index > -1) {
        files.splice(index, 1);
    }

    return files;
}

run();
