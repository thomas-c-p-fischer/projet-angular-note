# Memopus Angular Application

## Installation
1. installer les dépendances :
    `npm  install`
    `npm install json-server --save`
    `npm install bootstrap@5.3.3`

## Lancement de l'application
2. démarrer le sever json et lancer l'application :
    `npm run start:json-server` ==> http://localhost:3000/ et ne pas oubié le fichier db.json à la racin du projet
    `ng serve` ==> http://localhost:4200/

## Point clés
3. s'authentifier :
    -login : y
    -pwd : y

4. services :
    Les services sont responsables de la récupération, l'ajout et la mise à jour des données.
        -les observables et les subscriptions :
            les composants récupère les données de façon asynchrone en faisant appel au service. Le service return un flux d'observable auquel le composant souscrit pour pouvoir recevoir les mises à jour.
        - mise à jour en temps réel:
            quand un utilisateur ajoute un card ou un tag, le service envoit la données mise à jour au serveur, et le composant lui  rafraîchit sa vue en souscrivant au flux mis à jour.
    Par exemple dans l'application :
        -CardService gère les actions CRUD de Card
        -TagService gère les actions CRUD de Tag
        -Column récupère et tri Column

5. la modal de réponse :
    Pour la modal, j'ai choisi de créer un composant modal personnalisé. Le ts de la modal définit la logique de la modal et dans le ts de card on gère les actions de déclenchement de la modal et la logique de comparaison des réponses.