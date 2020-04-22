import fs from 'fs';
import request from 'request';
import { properties } from './utils/properties';
import { logger } from './utils/logger';

const dir = process.cwd() + '/bin';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const file = fs.createWriteStream(process.cwd() + '/bin/mocks-server.jar');

if (properties.get('http-proxy')) {
    request = request.defaults({ 'proxy': properties.get('http-proxy') });
}

logger.info('Début de récupération de mockserver.jar.');

request.get({
    uri: properties.get('repository')
})
    .pipe(file)
    .on('finish', () => {
        logger.info('Le fichier est téléchargé.');
    })
    .on('error', (error) => {
        logger.error('Impossible de récupérer le fichier', error);
    });
