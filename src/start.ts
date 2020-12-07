import * as child from "child_process";
import fs = require("fs");
import {getConfiguration} from "./utils/configuration";
import {logger} from "./utils/logger";

const dir = process.cwd() + "/bin/mocks-server.jar";

if (!fs.existsSync(dir)) {
    logger.error("No server detected. Run the command: npm install");
    process.exit();
}

const mockServer = child.spawn("java", getConfiguration());

mockServer.stdout.on("data", (data) => {
    console.log(data.toString());
});

mockServer.stderr.on("data", (data) => {
    console.error(data.toString());
});

mockServer.on("exit", () => {
    console.error("End of the process.");
});
