# Éditeur Markdown + tableau de bord

Application React qui réunit un **éditeur Markdown avec aperçu en direct** et un **tableau de bord** alimenté par plusieurs API publiques.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React%20Router-7-CA4245?logo=reactrouter&logoColor=white)

## Fonctionnalités

**Éditeur** (`/editor`)
- Saisie en Markdown et aperçu HTML en temps réel (conversion avec [Showdown](https://showdownjs.com/))
- Import d'un fichier `.md` depuis l'ordinateur
- Export du document en fichier `.md`

**Tableau de bord** (`/`)
- Date et heure
- Conseil du jour — [Advice Slip API](https://api.adviceslip.com/)
- Blague du jour — [Official Joke API](https://github.com/15Dkatz/official_joke_api)
- Événement historique du jour — [Today in History](https://history.muffinlabs.com/)
- Mocktail et recette du jour — [TheCocktailDB](https://www.thecocktaildb.com/) et [TheMealDB](https://www.themealdb.com/)
- Liste de documents et création d'un nouveau document

## Lancer le projet

Prérequis : Node.js 18+.

```bash
npm install
npm run dev
```

Puis ouvrir <http://localhost:5173>.

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm run build` | Version de production dans `dist/` |
| `npm run lint` | Vérification ESLint |

## Structure

```
src/
├── App.jsx                 routes (tableau de bord, éditeur)
└── Component/
    ├── Dashboard.jsx       widgets et appels aux API
    └── Editor.jsx          éditeur, aperçu, import / export
```

## Auteur

**OUATTARA Dongui** — [@xavi-ouattaradongui](https://github.com/xavi-ouattaradongui)
