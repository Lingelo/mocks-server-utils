const fs = require('fs');
const request = require('request');
const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(__dirname + '/../mocks-server.properties');
const logger = require('./logger');

const mocksFolder = __dirname + '/../mocks/';

function run() {
    checkServerStatus()
        .then(() => initMocks())
        .catch(() => process.exit());
}

function checkServerStatus() {

    return new Promise((resolve, reject) => {
        request.put(`http://${properties.get('host')}:${properties.get('port')}/status`)
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

function initMocks() {

    fs.readdir(mocksFolder, (err, files) => {

        if (!files) {
            logger.warn('Server déconnecté, arrêt du processus.');
            process.exit();
        }

        files.forEach(file => {
            fs.readFile(mocksFolder + file, 'utf8', (err, data) => {
                if (err) {
                    throw new Error(JSON.stringify(err))
                }

                request.put(`http://${properties.get('host')}:${properties.get('port')}/mockserver/expectation`, {form: data})
                    .on('error', () => {
                        logger.warn('Le server s\'est déconnecté, arrêt du processus.');
                        process.exit();
                    })
                    .on('response', (res) => {
                        if (res.statusCode >= 200 && res.statusCode < 400) {
                            logger.info(`Mock ${file} créé.`);
                        } else {
                            logger.error(`Mock non ${file} créé.`);
                        }
                    });
            });
        });
    });
}

run();

