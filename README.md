Swifty Companion

Le projet Swifty Companion est une application mobile destinée à afficher le profil d'un étudiant sur la plateforme 42 Intra en utilisant les données fournies par l'API de 42. L'application permet de voir les informations de l'utilisateur, y compris son profil, ses projets, ses compétences, et ses niveaux dans le cursus.
Objectifs du projet

L'objectif principal de ce projet est de créer une interface mobile interactive qui récupère des données depuis l'API de 42 et les affiche sous forme de carte ou de liste. L'application permettra aux utilisateurs de voir :
  - Leur photo de profil et informations personnelles.
  - Leur progression dans le cursus (niveau, points, etc.).
  - Les projets réalisés avec leur statut et leurs résultats.
  - Les compétences acquises avec leur niveau.

Lancer le projet :
  - git clone git@github.com:Fidget836/swifty_companion.git
  - curl -X POST --data "grant_type=client_credentials&client_id=MY_AWESOME_UID&client_secret=MY_AWESOME_SECRET" https://api.intra.42.fr/oauth/token
  - Remplacez "MY_AWESOME_UID" et "MY_AWESOME_SECRET" par vos clés API 42
  - vim .env
  - EXPO_PUBLIC_API_KEY="access_token"
  - Téléchargez l'application "Expo Go" sur votre mobile
  - npx expo start
  - Scannez le QR code avec votre mobile
