# Mock server utils

Mocks server utils is a tool for quickly starting a REST API mocks server.

The tool is ideal for:
* Share mocks during the development phase of an IT project. 
* Simulate a server during the automated testing phase.

Easy to use : Based on the mocks syntax of wiremock project [http://wiremock.org/](http://wiremock.org//).
Mock server utils consume mocks in json format in a directory (`mocks` by default).
Hot reload : Mocks can be injected while the server is running. 

## Get started

## Prerequisite 

| Dependency   | Version | 
|--------------|---------|
| nodeJs       | `>= 10` |
| JAVA         | `>= 8`  |

### On your post

* Install dependencies `npm install`.
* Start the server `npm start`.
* Start the mocks hot reload : `npm run mocks`.

To add new `mocks`, add a` .json` file under `mocks` then add the` stubning` which mocks the desired url. See documentation [here](http://wiremock.org/docs/stubbing/). 

### Setting

This utility can be configured through the `mocks-server.properties` file.

| Property    | Description                                                        | Default value     |
|-------------|--------------------------------------------------------------------|-------------------|
| port        | Mock server port 1080                                              | 1080              |
| host        | Mock server host                                                   | localhost         |
| log-level   | Mock server log level                                              | INFO              |
| watch-delay | Polling times (milliseconds) of the mocks director                 | 2000              |
| mocks-path  | Path to the directory where the mocks are                          |                   |
| repository  | Path to the maven repository containing the jar of the mock server | (Voir fichier)    |
| proxy-http  | HTTP proxy configuration string                                    | KO for the moment |
| verbose     | Make the server verbose                                            | true              |
