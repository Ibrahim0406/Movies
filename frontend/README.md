# 🎬 Kinematika - React Frontend

Moderni React frontend za aplikaciju Kinematika koja omogućava pregled filmova i dodavanje recenzija. Frontend aplikacija komunicira sa Spring Boot REST API backend-om.

## 📋 Sadržaj

- [Pregled](#pregled)
- [Funkcionalnosti](#funkcionalnosti)
- [Tehnologije](#tehnologije)
- [Preduslovi](#preduslovi)
- [Instalacija](#instalacija)
- [Pokretanje](#pokretanje)
- [Konfiguracija](#konfiguracija)
- [Struktura projekta](#struktura-projekta)
- [Komponente](#komponente)
- [API servisi](#api-servisi)
- [Build za produkciju](#build-za-produkciju)
- [Rješavanje problema](#rješavanje-problema)

## 🎯 Pregled

Frontend aplikacija pruža korisnički interfejs za:
- 📽️ Pregled liste filmova sa posterima
- 🔍 Pretragu filmova
- 🎬 Pregled detalja o filmovima
- ⭐ Dodavanje i prikaz recenzija
- 📱 Responsive dizajn za sve uređaje

## ✨ Funkcionalnosti

- **Lista filmova** - Grid prikaz svih dostupnih filmova sa posterima i osnovnim informacijama
- **Pretraga** - Pretraga filmova po nazivu ili žanru u realnom vremenu
- **Detalji filma** - Detaljne informacije o filmu uključujući:
  - Naziv, datum izlaska, žanrove
  - Poster i backdrop slike
  - Link ka traileru
  - Listu postojećih recenzija
- **Recenzije** - Forma za dodavanje novih recenzija i prikaz postojećih
- **Responsive dizajn** - Optimizovano za desktop, tablet i mobilne uređaje
- **React Router** - Single Page Application sa rutiranjem

## 🚀 Tehnologije

- **React 18.2.0** - UI biblioteka
- **React Router DOM 6.20.0** - Rutiranje
- **React Scripts 5.0.1** - Build alati
- **CSS3** - Stilizovanje (Flexbox, Grid)
- **Fetch API** - HTTP zahtevi ka backend API-ju

## 📦 Preduslovi

- **Node.js 14+** (preporučeno 16 ili novija verzija)
- **npm** ili **yarn**
- **Pokrenut backend server** na `http://localhost:8080`

Proverite verziju Node.js:
```bash
node --version
npm --version
```

## 🔧 Instalacija

1. **Navigirajte u frontend direktorijum:**
   ```bash
   cd frontend
   ```

2. **Instalirajte zavisnosti:**
   ```bash
   npm install
   ```

   Ovo će instalirati sve potrebne pakete definisane u `package.json`.

## 🚀 Pokretanje

### Development mode

Pokrenite development server:
```bash
npm start
```

Aplikacija će se automatski otvoriti u browseru na **http://localhost:3000**

Development server podržava:
- 🔥 Hot reload - automatsko osvežavanje pri izmenama
- ⚠️ Error overlay - prikaz grešaka u browseru
- 📊 React DevTools - debugging podrška

### Zaustavljanje servera

Pritisnite `Ctrl + C` u terminalu.

## ⚙️ Konfiguracija

### API URL konfiguracija

Ako vaš backend server radi na drugom portu ili URL-u, možete podesiti API URL na dva načina:

#### 1. Environment varijabla (preporučeno)

Kreirajte `.env` fajl u `frontend/` direktorijumu:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

#### 2. Direktno u kodu

Izmenite `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://your-backend-url:port/api/v1';
```

**Napomena:** Environment varijable moraju počinjati sa `REACT_APP_` da bi bile dostupne u React aplikaciji.

### Proxy konfiguracija

U `package.json` je već konfigurisan proxy:

```json
"proxy": "http://localhost:8080"
```

Ovo omogućava da zahtevi ka `/api/*` budu automatski prosleđeni backend serveru tokom development-a.

## 📁 Struktura projekta

```
frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # React komponente
│   │   ├── MovieList.js        # Lista filmova
│   │   ├── MovieList.css       # Stilovi za listu
│   │   ├── MovieCard.js        # Kartica filma
│   │   ├── MovieCard.css       # Stilovi za karticu
│   │   ├── MovieDetails.js     # Detalji filma
│   │   ├── MovieDetails.css    # Stilovi za detalje
│   │   ├── ReviewForm.js       # Forma za recenzije
│   │   └── ReviewForm.css      # Stilovi za formu
│   ├── services/
│   │   └── api.js              # API servisi (HTTP zahtevi)
│   ├── App.js                  # Glavna komponenta
│   ├── App.css                 # Glavni stilovi
│   ├── index.js                # Entry point
│   └── index.css               # Globalni stilovi
├── package.json                # Zavisnosti i skripte
├── .env                        # Environment varijable (kreirati)
└── README.md                   # Dokumentacija
```

## 🧩 Komponente

### MovieList
- Prikazuje grid sa svim filmovima
- Implementira pretragu
- Navigacija ka detaljima filma

### MovieCard
- Prikazuje pojedinačnu karticu filma
- Poster, naziv, žanrovi
- Klik na karticu vodi ka detaljima

### MovieDetails
- Prikazuje detaljne informacije o filmu
- Poster, backdrop slike
- Link ka traileru
- Lista recenzija
- Forma za dodavanje recenzije

### ReviewForm
- Forma za unos nove recenzije
- Validacija inputa
- Slanje zahteva ka backend-u

## 🔌 API servisi

API servisi se nalaze u `src/services/api.js`:

### `fetchAllMovies()`
Dohvata listu svih filmova.

```javascript
const movies = await fetchAllMovies();
```

### `fetchMovieByImdbId(imdbId)`
Dohvata detalje o filmu prema IMDb ID-u.

```javascript
const movie = await fetchMovieByImdbId('tt1234567');
```

### `createReview(reviewBody, imdbId)`
Kreira novu recenziju za film.

```javascript
const review = await createReview('Odličan film!', 'tt1234567');
```

## 🏗️ Build za produkciju

Za kreiranje optimizovanog produkcijskog build-a:

```bash
npm run build
```

Ovo će kreirati `build/` direktorijum sa optimizovanim fajlovima:
- Minifikovani JavaScript
- Optimizovane CSS fajlove
- Optimizovane slike
- Production-ready HTML

### Deploy produkcijskog build-a

Build fajlovi iz `build/` direktorijuma mogu biti deploy-ovani na:
- **Netlify**
- **Vercel**
- **GitHub Pages**
- **AWS S3 + CloudFront**
- Bilo koji statički hosting servis

### Testiranje produkcijskog build-a lokalno

```bash
npm install -g serve
serve -s build
```

## 🧪 Testiranje

Pokretanje testova:

```bash
npm test
```

## 🐛 Rješavanje problema

### Problem: Backend zahtevi ne rade

**Rešenje:**
1. Proverite da li je backend server pokrenut na `http://localhost:8080`
2. Proverite CORS konfiguraciju u backend-u
3. Proverite `REACT_APP_API_URL` u `.env` fajlu
4. Proverite browser konzolu za detaljne greške

### Problem: Port 3000 je zauzet

**Rešenje:**
React će automatski ponuditi alternativni port. Ili možete eksplicitno postaviti:

```bash
PORT=3001 npm start
```

### Problem: Module not found greške

**Rešenje:**
```bash
rm -rf node_modules package-lock.json
npm install
```

Na Windows-u:
```bash
rmdir /s node_modules
del package-lock.json
npm install
```

### Problem: Stilovi se ne primenjuju

**Rešenje:**
- Proverite da li su CSS fajlovi importovani u komponentama
- Proverite da li su putanje ispravne
- Restartujte development server

## 📝 Dodatne napomene

- Aplikacija koristi **React Router** za Single Page Application funkcionalnost
- Sve komponente su funkcionalne komponente sa React Hooks
- **Fetch API** se koristi za HTTP zahteve (nativno, bez dodatnih biblioteka)
- CSS moduli nisu korišćeni - stilovi su u odvojenim `.css` fajlovima
- Aplikacija je optimizovana za performanse sa React 18 features

## 🔗 Povezani dokumenti

- [Glavni README](../README.md) - Dokumentacija za cijelu aplikaciju
- [Backend README](../backend/README.md) - Dokumentacija za backend API

## 👨‍💻 Autor

**Ibrahim Bišić**

## 📄 Licenca

Ovaj projekat je kreiran za edukativne svrhe.

