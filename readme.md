# Utilitaire mock-server
Ce projet permet de démarrér rapidement [mock-server](http://www.mock-server.com/) avec des mocks paramétrés.
Il permet permet de mocker n'importe quel backend.

## Usages

* Installer le server `npm install`
* Démarrer le server `npm start` (dans une console à part)
* Les mocks sont dans le dossier `mocks` pour lancer leur intialisation : `npm run init:mocks`
* Ajouter de nouveaux `mocks`, ajouter un fichier `.json` sous `mocks` puis y ajouter l'`expectation` qui mock l'url souhaitée. Voir doucmentation [ici](http://www.mock-server.com/mock_server/creating_expectations.html) API Rest. 
* La configuration du projet est sous `mocks-server.properties`