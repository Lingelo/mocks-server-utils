import fs from 'fs';
import { spawn } from 'child_process';
import { logger } from './utils/logger';
import { getConfiguration } from './utils/configuration';

const dir = process.cwd() + '/bin/mocks-server.jar';

if (!fs.existsSync(dir)){
    logger.error('Aucun server détecté. Lancer la commande : npm install');
    process.exit();
}

const mockServer = spawn('java', getConfiguration());

mockServer.stdout.on('data', function (data) {
    console.log(data.toString());
});

mockServer.stderr.on('data', function (data) {
    console.error(data.toString());
});

mockServer.on('exit', function () {
    console.error('Fin du process.');
});
