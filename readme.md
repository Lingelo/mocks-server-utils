# Utilitaire de server de mocks

Ce projet permet de démarrer rapidement [http://wiremock.org/](http://wiremock.org//) avec des mocks paramétrés.
Il permet de mocker n'importe quel backend fournissant des APIs REST.

## Démarrage rapide

# En local
* Installer le server `npm install`.
* Démarrer le server `npm start`.
* Lancer la scrutation des mocks : `npm run mocks`.

Pour ajouter de nouveaux `mocks`, ajouter un fichier `.json` sous `mocks` puis y ajouter le `stubning` qui mock l'url souhaitée. Voir doucmentation [ici](http://wiremock.org/docs/stubbing/). 

# Paramétrage

L'utilitaire se configure à travers le fichier `mocks-server.properties`.

| Propriété   | Description                                                        | Valeur par défaut |
|-------------|--------------------------------------------------------------------|-------------------|
| port        | Port du server de mock 1080                                        | 1080              |
| host        | URI du server de mock                                              | localhost         |
| log-level   | Niveau de log du server de mock                                    | INFO              |
| watch-delay | Délais de scrutation (millisecondes) du répertoire de mocks        | 5000              |
| mocks-path  | Chemin vers le répertoire où sont les mocks                        |                   |
| repository  | Chemin vers le repository maven contenant le jar du server de mock | (Voir fichier)    |
| proxy-http  | Chaîne de configuration du proxy http                              |                   |

# Via image docker (périmée)

* Recupérer l'image docker : `docker pull freuhlon/mockserver:lastest`
* Lancer un container jettable : `docker run -d -p 1080:1080 --name mockserver --rm freuhlon/mockserver
`
