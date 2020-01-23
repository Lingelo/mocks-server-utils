const fs = require('fs');
const { spawn } = require('child_process');
const properties = require('./utils/properties');
const logger = require('./utils/logger');

const dir = process.cwd() + '/bin/mocks-server.jar';

if (!fs.existsSync(dir)){
    logger.error('Le binaire n\'a pas été téléchargé. Lancer la commande : npm install');
    process.exit();
}

const mockServer = spawn('java', [
    `-jar`,
    'bin/mocks-server.jar',
    '--port', properties.get('port'),
    '--verbose'
]);

mockServer.stdout.on('data', function (data) {
    console.log(data.toString());
});

mockServer.stderr.on('data', function (data) {
    console.log(data.toString());
});

mockServer.on('exit', function () {
    logger.error('Fin du process.');
});
