const PropertiesReader = require('properties-reader');
module.exports = new PropertiesReader(process.cwd() + '/mocks-server.properties');
