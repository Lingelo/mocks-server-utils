# Mock server utils

Mocks server utils est un outil permettant de démarrer un server de mocks d'APIs REST rapidement. 

L'outil est idéal pour : 
* Partager des mocks pendant la phase de développement d'un projet IT. 
* Simuler un server lors de la phase de tests automatisés.

Facile à utiliser : Se base sur la syntaxe de mocks du projet [http://wiremock.org/](http://wiremock.org//).
Mock server utils consomme les mocks au format json dans un répertoire (`mocks`par défaut). 
Hot reload : A l'ajout d'un nouveau nouveau mock à chaud : le mock est consommé directement. 

## Démarrage rapide

## Prérequis 

| Soft   | Version | 
|--------|---------|
| nodeJs | `>= 10` |
| JAVA   | `>= 8`  |

### En local

* Installer les dépendance du server `npm install`.
* Démarrer le server `npm start`.
* Lancer le hot reload des mocks : `npm run mocks`.

Pour ajouter de nouveaux `mocks`, ajouter un fichier `.json` sous `mocks` puis y ajouter le `stubning` qui mock l'url souhaitée. Voir doucmentation [ici](http://wiremock.org/docs/stubbing/). 

### Paramétrage

L'utilitaire se configure à travers le fichier `mocks-server.properties`.

| Propriété   | Description                                                        | Valeur par défaut |
|-------------|--------------------------------------------------------------------|-------------------|
| port        | Port du server de mock 1080                                        | 1080              |
| host        | URI du server de mock                                              | localhost         |
| log-level   | Niveau de log du server de mock                                    | INFO              |
| watch-delay | Délais de scrutation (millisecondes) du répertoire de mocks        | 2000              |
| mocks-path  | Chemin vers le répertoire où sont les mocks                        |                   |
| repository  | Chemin vers le repository maven contenant le jar du server de mock | (Voir fichier)    |
| proxy-http  | Chaîne de configuration du proxy http                              | KO Pour le moment |
| verbose     | Rendre le server verbeux                                           | true              |
