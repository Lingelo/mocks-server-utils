const PropertiesReader = require('properties-reader');
const properties = new PropertiesReader(__dirname + '/../mocks-server.properties');
const logger = require('./logger');
const { spawn } = require('child_process');
const fs = require('fs');

const dir = __dirname + '/../bin/mocks-server.jar';

if (!fs.existsSync(dir)){
    logger.error('Le binaire n\'a pas été téléchargé. Lancer la commande : npm install');
    process.exit();
}

const mockServer = spawn('java', [
    `-jar`,
    'bin/mocks-server.jar',
    '-serverPort', properties.get('port'),
    '-logLevel', properties.get('server-log-level')
]);

mockServer.stdout.on('data', function (data) {
    logger.info(data.toString());
});

mockServer.stderr.on('data', function (data) {
    logger.error(data.toString());
});

mockServer.on('exit', function (code) {
    logger.error('Fin du process.');
});

