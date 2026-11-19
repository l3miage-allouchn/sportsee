# SportSee

Tableau de bord sportif réalisé dans le cadre du parcours Développeur Front-End d'OpenClassrooms.

L'utilisateur se connecte, puis consulte ses statistiques de course : kilomètres parcourus par semaine, fréquence cardiaque, objectif de la semaine et informations de profil.

## Stack

- React 19 + TypeScript
- React Router 8 (mode framework, SSR désactivé)
- Recharts pour les graphiques
- Vite
- CSS natif

## Prérequis

- Node.js 22
- Le backend du projet : https://github.com/OpenClassrooms-Student-Center/P6JS

## Lancer le projet

### 1. Le backend

```bash
git clone https://github.com/OpenClassrooms-Student-Center/P6JS.git backend
cd backend
npm install
npm start
```

L'API tourne sur http://localhost:8000.

### 2. Le front

```bash
git clone https://github.com/l3miage-allouchn/sportsee.git
cd sportsee
npm install
cp .env.example .env
npm run dev
```

L'application est disponible sur http://localhost:5173.

## Variables d'environnement

| Variable | Rôle |
|---|---|
| `VITE_USE_MOCK` | `true` : utilise les données de `app/mocks` (pas besoin du backend). `false` : appelle l'API |
| `VITE_API_URL` | Adresse du backend, par défaut `http://localhost:8000` |

Après une modification du `.env`, il faut relancer `npm run dev`.

## Comptes de test

Avec le backend (`VITE_USE_MOCK=false`) :

| Identifiant | Mot de passe |
|---|---|
| sophiemartin | password123 |
| marcdubois | password456 |
| emmaleroy | password789 |

En mode mock, n'importe quel identifiant permet de se connecter.

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production dans `build/` |
| `npm run typecheck` | Vérification des types TypeScript |

## Organisation du code

```
app/
├── routes.ts          déclaration des routes
├── routes/            pages : login, dashboard, profil, 404
├── layouts/           layout protégé (redirige vers /login sans token)
├── components/        composants d'affichage et graphiques
├── contexts/          AuthContext : token et déconnexion
├── services/          appels à l'API (fetch), sans React
├── hooks/             useUserInfo, useUserActivity → { data, loading, error }
├── utils/formatters/  mise en forme des données de l'API pour les composants
├── utils/             cookies, dates, couleurs
└── mocks/             données de test au format de l'API
```

## Authentification

Le login envoie un `POST /api/login`. Le token JWT renvoyé est stocké dans un cookie, puis envoyé dans l'en-tête `Authorization: Bearer <token>` à chaque requête. Si l'API répond 401 ou 403, le cookie est supprimé et l'utilisateur est renvoyé vers la page de connexion.
