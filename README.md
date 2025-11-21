# 🎬 Kinematika - Aplikacija za pregled filmova i recenzija

**Kinematika** je full-stack web aplikacija za pregled filmova i upravljanje korisničkim recenzijama. Aplikacija se sastoji od Spring Boot REST API backend-a i React frontend-a.

## 📋 Sadržaj

- [Pregled](#pregled)
- [Tehnologije](#tehnologije)
- [Struktura projekta](#struktura-projekta)
- [Preduslovi](#preduslovi)
- [Instalacija i pokretanje](#instalacija-i-pokretanje)
- [Funkcionalnosti](#funkcionalnosti)
- [API dokumentacija](#api-dokumentacija)
- [Konfiguracija](#konfiguracija)
- [Autor](#autor)

## 🎯 Pregled

Kinematika omogućava korisnicima:
- 📽️ Pregled liste filmova sa posterima i osnovnim informacijama
- 🔍 Pretragu filmova
- 🎬 Pregled detalja o pojedinačnom filmu
- ⭐ Dodavanje i pregled recenzija za filmove
- 📱 Responsive dizajn optimizovan za sve uređaje

## 🚀 Tehnologije

### Backend
- **Java 25**
- **Spring Boot 3.5.7**
- **Spring Data MongoDB**
- **MongoDB Atlas** (cloud baza podataka)
- **Lombok**
- **Maven**

### Frontend
- **React 18.2.0**
- **React Router DOM 6.20.0**
- **CSS3** (Flexbox, Grid)
- **Fetch API**

## 📁 Struktura projekta

```
Filmovi/
├── backend/
│   └── Filmovi/
│       ├── src/
│       │   └── main/
│       │       ├── java/me/ibrahimbisic/Filmovi/
│       │       │   ├── Config/
│       │       │   │   └── CorsConfig.java
│       │       │   ├── Controller/
│       │       │   │   ├── MovieController.java
│       │       │   │   └── ReviewController.java
│       │       │   ├── Models/
│       │       │   │   ├── Movie.java
│       │       │   │   └── Review.java
│       │       │   ├── Repository/
│       │       │   │   ├── MovieRepository.java
│       │       │   │   └── ReviewRepository.java
│       │       │   ├── Service/
│       │       │   │   ├── MovieService.java
│       │       │   │   └── ReviewService.java
│       │       │   └── FilmoviApplication.java
│       │       └── resources/
│       │           └── application.properties
│       └── pom.xml
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── MovieList.js
│   │   │   ├── MovieCard.js
│   │   │   ├── MovieDetails.js
│   │   │   └── ReviewForm.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```

## 📦 Preduslovi

Prije pokretanja aplikacije, potrebno je imati instalirano:

- **Java 25** ili novija verzija
- **Maven 3.6+**
- **Node.js 14+** i **npm**
- **MongoDB Atlas** nalog (ili lokalni MongoDB)
- **Git** (opciono)

## 🔧 Instalacija i pokretanje

### 1. Kloniranje repozitorija

```bash
git clone <repository-url>
cd Filmovi
```

### 2. Backend setup

```bash
cd backend/Filmovi
```

Kreirajte `.env` fajl u `backend/Filmovi/` direktorijumu sa sledećim varijablama:

```env
MONGO_DATABASE=your_database_name
MONGO_USER=your_mongodb_username
MONGO_PASSWORD=your_mongodb_password
MONGO_CLUSTER=your_cluster.mongodb.net
```

Instalirajte zavisnosti i pokrenite backend:

```bash
mvn clean install
mvn spring-boot:run
```

Backend će biti dostupan na: **http://localhost:8080**

### 3. Frontend setup

Otvorite novi terminal i navigirajte u frontend direktorijum:

```bash
cd frontend
npm install
npm start
```

Frontend će biti dostupan na: **http://localhost:3000**

## ✨ Funkcionalnosti

### Backend API

- **GET** `/api/v1/movies` - Vraća listu svih filmova
- **GET** `/api/v1/movies/{imdbId}` - Vraća detalje o filmu prema IMDb ID-u
- **POST** `/api/v1/reviews` - Kreira novu recenziju za film

### Frontend

- **Lista filmova** - Prikaz svih filmova sa posterima u grid layout-u
- **Pretraga** - Pretraga filmova po nazivu ili žanru
- **Detalji filma** - Prikaz detaljnih informacija o filmu
- **Recenzije** - Dodavanje i prikaz recenzija za svaki film
- **Responsive dizajn** - Optimizovano za desktop, tablet i mobilne uređaje

## 📡 API dokumentacija

### Filmovi

#### GET /api/v1/movies
Vraća listu svih filmova.

**Response:**
```json
[
  {
    "id": "...",
    "imdbId": "tt1234567",
    "title": "Naziv filma",
    "releaseDate": "2024-01-01",
    "trailerLink": "https://...",
    "poster": "https://...",
    "genres": ["Akcija", "Drama"],
    "backdrops": ["https://..."],
    "reviewIds": [...]
  }
]
```

#### GET /api/v1/movies/{imdbId}
Vraća detalje o filmu prema IMDb ID-u.

**Response:**
```json
{
  "id": "...",
  "imdbId": "tt1234567",
  "title": "Naziv filma",
  ...
}
```

### Recenzije

#### POST /api/v1/reviews
Kreira novu recenziju za film.

**Request Body:**
```json
{
  "reviewBody": "Odličan film!",
  "imdbId": "tt1234567"
}
```

**Response:**
```json
{
  "id": "...",
  "body": "Odličan film!"
}
```

## ⚙️ Konfiguracija

### Backend

Konfiguracija se nalazi u `backend/Filmovi/src/main/resources/application.properties`:

```properties
spring.application.name=Filmovi
spring.data.mongodb.database=${MONGO_DATABASE}
spring.data.mongodb.uri=mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}
```

### Frontend

API URL se može konfigurisati kroz environment varijablu ili direktno u `src/services/api.js`:

```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1';
```

Kreirajte `.env` fajl u `frontend/` direktorijumu:

```env
REACT_APP_API_URL=http://localhost:8080/api/v1
```

## 🗄️ Baza podataka

Aplikacija koristi **MongoDB Atlas** kao cloud bazu podataka. Baza podataka sadrži dvije kolekcije:

- **movies** - Informacije o filmovima
- **reviews** - Korisničke recenzije

## 🧪 Testiranje

### Backend testovi

```bash
cd backend/Filmovi
mvn test
```

### Frontend testovi

```bash
cd frontend
npm test
```

## 📝 Build za produkciju

### Backend

```bash
cd backend/Filmovi
mvn clean package
java -jar target/Filmovi-0.0.1-SNAPSHOT.jar
```

### Frontend

```bash
cd frontend
npm run build
```

Build fajlovi će biti u `frontend/build/` direktorijumu.

## 🐛 Rješavanje problema

### Backend ne može da se poveže sa bazom podataka
- Proverite da li su MongoDB credentials ispravno postavljeni u `.env` fajlu
- Proverite da li je MongoDB Atlas IP whitelist konfigurisan

### Frontend ne može da komunicira sa backend-om
- Proverite da li je backend server pokrenut na portu 8080
- Proverite CORS konfiguraciju u `CorsConfig.java`
- Proverite `REACT_APP_API_URL` u `.env` fajlu

## 👨‍💻 Autor

**Ibrahim Bišić**

## 📄 Licenca

Ovaj projekat je kreiran za edukativne svrhe.
