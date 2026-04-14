# FXAIR Clone — React + Express

Reproduction du site [fxair.com](https://www.fxair.com) avec React.js (front-end) et Express.js (back-end API).

---

## 🚀 Démarrage rapide

### Prérequis
- Node.js v18+
- npm v9+
- MongoDB (optionnel — l'app fonctionne en mémoire sans)

### 1. Cloner et installer

```bash
git clone <votre-repo>
cd fxair

# Installer les dépendances serveur
cd server
npm install

# Installer les dépendances client
cd ../client
npm install
```

### 2. Configuration

Copier le fichier `.env` dans le dossier `server/` :

```env
PORT=5000
CLIENT_URL=http://localhost:3000
MONGODB_URI=mongodb://localhost:27017/fxair
NODE_ENV=development
```

### 3. Lancer l'application

**Terminal 1 — Serveur Express :**
```bash
cd server
npm run dev
# → API disponible sur http://localhost:5000
```

**Terminal 2 — Client React :**
```bash
cd client
npm start
# → App disponible sur http://localhost:3000
```

---

## 📁 Structure du projet

```
fxair/
├── server/                        # Back-end Express
│   ├── index.js                   # Point d'entrée
│   ├── config/
│   │   └── db.js                  # Connexion MongoDB
│   ├── models/
│   │   └── index.js               # Modèles Mongoose
│   ├── routes/
│   │   ├── flights.js             # POST /api/flights/request
│   │   ├── destinations.js        # GET  /api/destinations
│   │   ├── memberships.js         # GET  /api/memberships
│   │   ├── aircraft.js            # GET  /api/aircraft
│   │   └── contact.js             # POST /api/contact
│   └── .env
│
└── client/                        # Front-end React
    ├── public/
    │   └── index.html
    └── src/
        ├── App.js                 # Router principal
        ├── App.css                # Variables globales + reset
        ├── components/
        │   ├── Navbar.js/.css     # Navigation fixe responsive
        │   ├── Footer.js/.css     # Pied de page complet
        │   ├── FlightBooking.js   # Widget de réservation
        │   └── AircraftGrid.js    # Grille d'avions avec filtres
        ├── pages/
        │   ├── Home.js/.css       # Page d'accueil
        │   ├── PremiumCharter.js  # L'expérience FXAIR
        │   ├── Memberships.js     # Plans Aviator / Aviator+
        │   ├── Destinations.js    # Grille destinations
        │   ├── DestinationDetail  # Détail d'une destination
        │   ├── FXSelect.js        # Flotte FXSELECT
        │   ├── Contact.js         # Formulaire de contact
        │   └── Blog.js            # Blog Flight Frequencies
        ├── hooks/
        │   └── useFetch.js        # Hook générique fetch
        └── assets/
            └── api.js             # Service API centralisé
```

---

## 🌐 Pages reproduites

| Route | Page |
|-------|------|
| `/` | Accueil — hero, réservation, flotte, destinations, ressources |
| `/en-us/premium-charter` | L'expérience premium FXAIR |
| `/en-us/memberships` | Plans Aviator & Aviator+ |
| `/en-us/destinations` | Toutes les destinations |
| `/en-us/destinations/:slug` | Détail destination + réservation |
| `/en-us/fxselect` | Flotte FXSELECT détaillée |
| `/en-us/contact` | Formulaire de contact |
| `/en-us/blog` | Blog Flight Frequencies |

---

## 🔌 API Endpoints

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| `GET` | `/api/health` | Statut du serveur |
| `GET` | `/api/aircraft` | Liste des avions (`?category=Light&fxselect=true`) |
| `GET` | `/api/aircraft/:id` | Détail d'un avion |
| `GET` | `/api/destinations` | Destinations (`?featured=true`) |
| `GET` | `/api/destinations/:slug` | Détail d'une destination |
| `POST` | `/api/flights/request` | Soumettre une demande de vol |
| `GET` | `/api/flights/airports/search` | Recherche aéroports (`?q=new`) |
| `GET` | `/api/memberships` | Plans d'adhésion |
| `POST` | `/api/memberships/inquire` | Demande d'adhésion |
| `POST` | `/api/contact` | Envoyer un message |

### Exemple — Demande de vol

```bash
curl -X POST http://localhost:5000/api/flights/request \
  -H "Content-Type: application/json" \
  -d '{
    "from": "New York",
    "to": "Miami",
    "departure": "2026-05-15",
    "passengers": 4,
    "tripType": "one-way"
  }'
```

---

## 🎨 Design System

Le projet reproduit fidèlement l'identité visuelle FXAIR :

| Élément | Valeur |
|---------|--------|
| Couleur principale | `#0a0a0a` (noir profond) |
| Couleur or | `#C9A96E` |
| Police display | Cormorant Garamond |
| Police body | Barlow |
| Police condensée | Barlow Condensed |

---

## 🗄️ Avec MongoDB

Pour activer la persistance, s'assurer que MongoDB tourne localement :

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

L'URI est configurée dans `server/.env`. Sans MongoDB, l'app utilise des données en mémoire (se réinitialise au redémarrage).

---

## 📦 Build production

```bash
# Compiler le front React
cd client
npm run build

# Le serveur Express peut servir le build statique
# Ajouter dans server/index.js :
# app.use(express.static(path.join(__dirname, '../client/build')));
```

---

© 2026 FXAIR Clone — à des fins pédagogiques uniquement.
# frontend
