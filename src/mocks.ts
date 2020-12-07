import fs = require("fs");
import md5File = require("md5-file");
import request = require("request");
import {logger} from "./utils/logger";
import {properties} from "./utils/properties";
import ErrnoException = NodeJS.ErrnoException;

const mocksFolder = properties.get("mocks-path") ? properties.get("mocks-path") : process.cwd() + "/mocks/";
const hashes = [];
let isProcessing = false;

function run() {
    checkServerStatus()
        .then(() => setInterval(createMocks, properties.get("watch-delay")))
        .catch(() => process.exit());
}

function checkServerStatus() {
    return new Promise((resolve, reject) => {
        request.get(`http://${properties.get("host")}:${properties.get("port")}/__admin/requests/`)
            .on("error", () => {
                logger.error("Server disconnected.");
                reject();
            })
            .on("data", () => {
                logger.info("Server connected.");
                resolve();
            });
    });
}

function createMocks() {

    if (isProcessing) {
        return;
    }

    fs.readdir(mocksFolder, (err, files) => {
        if (!files) {
            logger.error("Invalid mocks folder, process shutdown.");
            process.exit();
        }

        let filesToProcess = files;

        files.forEach((file) => {

            const hash = md5File.sync(mocksFolder + "/" + file);

            fs.readFile(mocksFolder + "/" + file, "utf8", (error: ErrnoException | null, data: string) => {
                if (error) {
                    throw new Error(JSON.stringify(error));
                }

                data = setCorsHeaders(data);

                const option = {
                    body: data,
                    method: "POST",
                    uri: `http://${properties.get("host")}:${properties.get("port")}/__admin/mappings/new`,
                };

                request(option)
                    .on("error", () => {
                        logger.warn("The server has disconnected, the process is stopping ...");
                        process.exit();
                    })
                    .on("response", (res) => {

                        if (!hashes.includes(hash)) {
                            hashes.push(hash);
                        } else {
                            return;
                        }

                        if (res.statusCode >= 200 && res.statusCode < 400) {
                            logger.info(`Mock ${file} created.`);
                        } else {
                            logger.error(`Mock ${file} not created.`);
                        }

                        filesToProcess = removeProcessedFile(filesToProcess, file);
                        isProcessing = filesToProcess.length > 0;
                    });
            });
        });
    });
}

function setCorsHeaders(data) {

    const statusCode = data.indexOf('"status": ');

    const headers = '"headers":\n' +
        "    {\n" +
        '      "Content-Type" : "application/json",\n' +
        '      "Access-Control-Allow-Origin" : "*",\n' +
        '      "Access-Control-Allow-Methods" : "*",\n' +
        '      "Access-Control-Allow-Headers": "*",\n' +
        '      "X-Content-Type-Options" : "nosniff",\n' +
        '      "x-frame-options" : "DENY",\n' +
        '      "x-xss-protection" : "1; mode=block"\n' +
        "    },";

    data = data.slice(0, statusCode + '"status": '.length + 4)
        + headers + data.slice(statusCode + '"status": '.length + 4);

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
