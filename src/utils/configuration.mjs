import { properties } from './properties';

function ConfigurationBuilder() {

    const value = ['-jar', 'bin/mocks-server.jar'];

    this.build = () => {
        value.push('--disable-banner');
        return value;
    }

    this.port = (port) => {
        value.push('--port');
        value.push(port);
        return this;
    }

    this.verbose = (enabled) => {
        if(enabled) {
            value.push('--verbose');
        }
        return this;
    }

    this.enableRequestJournal = (enabled) => {
        if (!enabled) {
            value.push('--no-request-journal');
        }
        return this;
    }

}

export const getConfiguration = () => {
    return new ConfigurationBuilder()
        .port(properties.get('port'))
        .enableRequestJournal(properties.get('enable-request-journal'))
        .verbose(properties.get('verbose'))
        .build();
}
