# Utilitaire de server de mocks

Ce projet permet de démarrér rapidement [http://wiremock.org/](http://wiremock.org//) avec des mocks paramétrés.
Il permet permet de mocker n'importe quel backend.

## Usages

* Installer le server `npm install`
* Démarrer le server `npm start` (dans une console à part)
* Les mocks sont dans le dossier `mocks` pour lancer leur intialisation : `npm run init:mocks`
* Ajouter de nouveaux `mocks`, ajouter un fichier `.json` sous `mocks` puis y ajouter le `stubning` qui mock l'url souhaitée. Voir doucmentation [ici](http://wiremock.org/docs/stubbing/) API Rest. 
* La configuration du projet est sous `mocks-server.properties`

L'utilitaire se configure à travers `mocks-server.properties`