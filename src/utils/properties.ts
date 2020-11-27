import builder = require("properties-reader");
export const properties = builder(process.cwd() + "/mocks-server.properties");
