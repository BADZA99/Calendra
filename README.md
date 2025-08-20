# calendevents - Application de gestion d'événements

🌐 **Application déployée** : [https://calendevents.vercel.app/](https://calendevents.vercel.app/)

calendevents est une application web de gestion et de réservation d'événements et de créneaux horaires. Elle permet aux utilisateurs de créer des événements privés ou publics, de gérer leur planning, et d'offrir la possibilité à d'autres utilisateurs de réserver des créneaux pour des réunions ou des événements. L'interface propose une navigation claire entre les espaces publics et privés, la gestion des profils, et l'intégration avec Google Calendar pour synchroniser les événements.

## Stack technique

- **Next.js** : Framework React pour le développement web fullstack, utilisé pour le routage, le rendu côté serveur et la gestion des pages.
- **TypeScript** : Typage statique pour une meilleure fiabilité et maintenabilité du code.
- **Drizzle ORM** : Gestion de la base de données et des migrations SQL.
- **Neon** : Base de données PostgreSQL serverless pour le stockage des données.
- **Google APIs** : Intégration avec Google Calendar pour la synchronisation des événements.
- **Clerk** : Gestion de l'authentification et des utilisateurs.
- **PostCSS** : Traitement avancé du CSS.
- **Composants UI personnalisés** : Utilisation de composants réutilisables pour les formulaires, boutons, calendriers, etc.

## Aperçu visuel

Voici quelques captures d'écran illustrant les principales fonctionnalités de calendevents :

### Page de réservation réussie
![Booking Success](screenshots/booking%20success.png)

### Page de connexion
![Login Page](screenshots/login%20page.png)

### Profil public
![Public Profile](screenshots/public%20profile.png)

### Page de planning
![Schedule Page](screenshots/schedule%20page.png)

### Page des événements de l'utilisateur
![User's Events Page](screenshots/user's%20events%20page.png)

## Installation et configuration

1. Clonez le dépôt
```bash
git clone https://github.com/BADZA99/calendevents.git
cd calendevents
```

2. Installez les dépendances
```bash
npm install
# ou
yarn install
```

3. Configurez les variables d'environnement
- Créez un fichier `.env` à la racine du projet
- Ajoutez les variables nécessaires :
  ```
  # Base de données
  DATABASE_URL=votre_url_neon_db

  # Clerk Auth
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=votre_clerk_publishable_key
  CLERK_SECRET_KEY=votre_clerk_secret_key

  # Google Calendar
  GOOGLE_CLIENT_ID=votre_google_client_id
  GOOGLE_CLIENT_SECRET=votre_google_client_secret
  ```

4. Lancez les migrations de la base de données
```bash
npm run db:push
```

5. Démarrez le serveur de développement
```bash
npm run dev
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


