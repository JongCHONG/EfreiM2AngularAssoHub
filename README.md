# EFREI M2 Groupe 1 : Maylis GAILLARD, Jong Hoa CHONG
---
# Gestionnaire de Contacts Angular

## Description

Ce projet est une application de gestion de contacts développée avec **Angular**. Elle permet :
- De lister, modifier et supprimer des contacts.
- De trier les contacts par colonnes.
- D'envoyer des emails simulés (via JSON Server ou Mailtrap pour les tests).

Le projet utilise :
- **Angular v16** pour le front-end.
- **JSON Server** comme API REST simulée pour la gestion des données.

---

## Fonctionnalités

- **Authentification simulée** : Connexion utilisateur avec stockage local.
- **Gestion des contacts** : Ajouter, supprimer et trier les contacts.
- **Catégories de contacts** : Associer chaque contact à une catégorie (ex. Membres, Partenaires).
- **Envoi d'emails simulé** : Simuler l'envoi d'emails via JSON Server ou Mailtrap.

---

## Prérequis

Avant de commencer, assurez-vous que vous avez installé :
- **Node.js** (v14 ou supérieur)
- **Angular CLI** (v16 ou supérieur)
- **JSON Server**

---

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/votre-repo.git
   cd votre-repo
   ```

2. Installez les dépendances Angular :
   ```bash
   npm install
   ```

3. Installez JSON Server globalement si ce n'est pas encore fait :
   ```bash
   npm install -g json-server
   ```
   
4. Installez email-server (dans le dossier email-server)
   ```bash
   npm install
   ```
---

## Lancer le projet

### Lancer JSON Server
1. Démarrez JSON Server :
   ```bash
   npm run start:api
   ```

### Lancer l'application Angular
1. Démarrez l'application Angular en mode développement :
   ```bash
   ng serve
   ```
2. Accédez à l'application dans votre navigateur à l'adresse :
   ```
   http://localhost:4200
   ```
### Lancer email-server
1. Allez dans le dossier email-server
   ```
   node server.js
   ```
---

## Exemple de fichier `db.json`

Voici un exemple de structure pour `db.json` utilisé par JSON Server :

```json
{
  "users": [
    {
      "id": "1",
      "username": "admin",
      "email": "admin@example.com",
      "password": "password"
    }
  ],
  "contacts": [
    {
      "id": "1",
      "title": "John Doe",
      "email": "john@example.com",
      "category_id": "1",
      "user_id": "1"
    }
  ],
  "categories": [
    {
      "id": "1",
      "category_name": "Membres"
    }
  ],
  "emails": []
}
```

---

## Envoi d'emails

### Simulation via JSON Server
Les emails envoyés seront enregistrés dans la section `emails` de `db.json` pour simuler un envoi réel.

### Tests avec Mailtrap
Vous pouvez configurer Mailtrap pour capturer les emails dans un environnement de développement. Voici un exemple de configuration SMTP dans **Node.js** pour Mailtrap :
```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'votre-utilisateur-mailtrap',
    pass: 'votre-mot-de-passe-mailtrap',
  },
});
```

---

## Technologies utilisées

- **Angular v16** : Framework front-end pour construire l'application.
- **JSON Server** : Simulateur d'API REST pour la gestion des données.
- **RxJS** : Gestion des requêtes HTTP et des flux de données.
- **Mailtrap** (facultatif) : Test d'envoi d'emails dans un environnement sécurisé.
