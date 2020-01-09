const request = require('request');
const fs = require('fs');

const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(__dirname + '/../mocks-server.properties');
const logger = require('./logger');

const dir = './bin';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

const file = fs.createWriteStream("bin/mocks-server.jar");

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
