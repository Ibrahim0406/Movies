# Kinematika - React Frontend

Moderni React frontend za aplikaciju Filmovi koja omogućava pregled filmova i dodavanje recenzija.

## Funkcionalnosti

- 📽️ **Lista filmova** - Pregled svih dostupnih filmova sa posterima
- 🔍 **Pretraga** - Pretraga filmova po nazivu ili žanru
- 🎬 **Detalji filma** - Detaljne informacije o filmu
- ⭐ **Recenzije** - Dodavanje i pregled recenzija za filmove
- 📱 **Responsive dizajn** - Optimizovano za sve uređaje

## Preduslovi

- Node.js (verzija 14 ili novija)
- npm ili yarn
- Pokrenut backend server na `http://localhost:8080`

## Instalacija

1. Navigirajte u `frontend` direktorijum:
```bash
cd frontend
```

2. Instalirajte zavisnosti:
```bash
npm install
```

## Pokretanje

Pokrenite development server:
```bash
npm start
```

Aplikacija će biti dostupna na `http://localhost:3000`

## Konfiguracija

Ako vaš backend server radi na drugom portu ili URL-u, možete podesiti `REACT_APP_API_URL` u `.env` fajlu:

```
REACT_APP_API_URL=http://localhost:8080/api/v1
```

Ili promeniti direktno u `src/services/api.js` fajlu.

## Build za produkciju

Za kreiranje produkcijskog build-a:

```bash
npm run build
```

Build fajlovi će biti u `build` direktorijumu.

## Struktura projekta

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── MovieList.js
│   │   ├── MovieList.css
│   │   ├── MovieCard.js
│   │   ├── MovieCard.css
│   │   ├── MovieDetails.js
│   │   ├── MovieDetails.css
│   │   ├── ReviewForm.js
│   │   └── ReviewForm.css
│   ├── services/
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
├── package.json
└── README.md
```

## Tehnologije

- React 18
- React Router DOM 6
- CSS3 (Flexbox, Grid)
- Fetch API za HTTP zahteve

## Napomena

Uverite se da je backend server pokrenut pre pokretanja frontend aplikacije.

