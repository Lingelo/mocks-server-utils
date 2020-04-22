import fs from 'fs';
import { spawn } from 'child_process';
import { properties } from './utils/properties';
import { logger } from './utils/logger';

const dir = process.cwd() + '/bin/mocks-server.jar';

if (!fs.existsSync(dir)){
    logger.error('Le binaire n\'a pas été téléchargé. Lancer la commande : npm install');
    process.exit();
}

const mockServer = spawn('java', [
    '-jar',
    'bin/mocks-server.jar',
    '--port', properties.get('port'),
    '--verbose'
]);

mockServer.stdout.on('data', function (data) {
    logger.info(data.toString());
});

mockServer.stderr.on('data', function (data) {
    logger.error(data.toString());
});

mockServer.on('exit', function () {
    logger.error('Fin du process.');
});
