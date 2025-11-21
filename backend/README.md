# 🎬 Kinematika - Backend API

Spring Boot REST API za upravljanje filmovima i recenzijama. Backend aplikacija koristi MongoDB za čuvanje podataka i pruža RESTful API endpoint-e za frontend aplikaciju.

## 📋 Sadržaj

- [Pregled](#pregled)
- [Tehnologije](#tehnologije)
- [Struktura projekta](#struktura-projekta)
- [Preduslovi](#preduslovi)
- [Instalacija](#instalacija)
- [Konfiguracija](#konfiguracija)
- [Pokretanje](#pokretanje)
- [API Endpoints](#api-endpoints)
- [Modeli podataka](#modeli-podataka)
- [Arhitektura](#arhitektura)
- [Testiranje](#testiranje)

## 🎯 Pregled

Backend aplikacija pruža REST API za:
- 📽️ Upravljanje filmovima (pregled, pretraga)
- ⭐ Upravljanje recenzijama (kreiranje, povezivanje sa filmovima)
- 🔗 Povezivanje recenzija sa filmovima kroz MongoDB referenciranje

## 🚀 Tehnologije

- **Java 25**
- **Spring Boot 3.5.7**
- **Spring Data MongoDB** - za rad sa MongoDB bazom podataka
- **Spring Web** - za REST API funkcionalnost
- **Lombok** - za smanjenje boilerplate koda
- **Maven** - za upravljanje zavisnostima
- **MongoDB Atlas** - cloud baza podataka
- **Spring Dotenv** - za učitavanje environment varijabli

## 📁 Struktura projekta

```
backend/Filmovi/
├── src/
│   ├── main/
│   │   ├── java/me/ibrahimbisic/Filmovi/
│   │   │   ├── Config/
│   │   │   │   └── CorsConfig.java          # CORS konfiguracija
│   │   │   ├── Controller/
│   │   │   │   ├── MovieController.java     # REST endpoint-i za filmove
│   │   │   │   └── ReviewController.java    # REST endpoint-i za recenzije
│   │   │   ├── Models/
│   │   │   │   ├── Movie.java               # Movie entitet
│   │   │   │   └── Review.java              # Review entitet
│   │   │   ├── Repository/
│   │   │   │   ├── MovieRepository.java     # MongoDB repository za filmove
│   │   │   │   └── ReviewRepository.java    # MongoDB repository za recenzije
│   │   │   ├── Service/
│   │   │   │   ├── MovieService.java        # Business logika za filmove
│   │   │   │   └── ReviewService.java       # Business logika za recenzije
│   │   │   └── FilmoviApplication.java      # Main Spring Boot aplikacija
│   │   └── resources/
│   │       └── application.properties        # Konfiguracija aplikacije
│   └── test/
│       └── java/me/ibrahimbisic/Filmovi/
│           └── FilmoviApplicationTests.java
├── pom.xml                                   # Maven konfiguracija
└── .env                                      # Environment varijable (kreirati)
```

## 📦 Preduslovi

- **Java 25** ili novija verzija
- **Maven 3.6+**
- **MongoDB Atlas** nalog (ili lokalni MongoDB server)
- IDE (IntelliJ IDEA, Eclipse, VS Code) - opciono

## 🔧 Instalacija

1. **Navigirajte u backend direktorijum:**
   ```bash
   cd backend/Filmovi
   ```

2. **Instalirajte Maven zavisnosti:**
   ```bash
   mvn clean install
   ```

3. **Kreirajte `.env` fajl** u `backend/Filmovi/` direktorijumu:
   ```env
   MONGO_DATABASE=your_database_name
   MONGO_USER=your_mongodb_username
   MONGO_PASSWORD=your_mongodb_password
   MONGO_CLUSTER=your_cluster.mongodb.net
   ```

## ⚙️ Konfiguracija

### application.properties

Konfiguracija se nalazi u `src/main/resources/application.properties`:

```properties
spring.application.name=Filmovi
spring.data.mongodb.database=${MONGO_DATABASE}
spring.data.mongodb.uri=mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_CLUSTER}
```

### MongoDB Atlas Setup

1. Kreirajte nalog na [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Kreirajte novi cluster
3. Kreirajte database korisnika sa read/write pravima
4. Dodajte vašu IP adresu u Network Access whitelist
5. Kopirajte connection string i ažurirajte `.env` fajl

### CORS Konfiguracija

CORS je konfigurisan u `Config/CorsConfig.java` da dozvoli zahteve sa frontend aplikacije (default: `http://localhost:3000`).

## 🚀 Pokretanje

### Development mode

```bash
mvn spring-boot:run
```

Ili koristeći Maven wrapper:

```bash
./mvnw spring-boot:run
```

Na Windows-u:
```bash
mvnw.cmd spring-boot:run
```

Aplikacija će biti dostupna na: **http://localhost:8080**

### Production build

```bash
mvn clean package
java -jar target/Filmovi-0.0.1-SNAPSHOT.jar
```

## 📡 API Endpoints

### Base URL
```
http://localhost:8080/api/v1
```

### Filmovi

#### GET /api/v1/movies
Vraća listu svih filmova.

**Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "imdbId": "tt1234567",
    "title": "Naziv filma",
    "releaseDate": "2024-01-01",
    "trailerLink": "https://www.youtube.com/watch?v=...",
    "poster": "https://image.tmdb.org/t/p/w500/...",
    "genres": ["Akcija", "Drama", "Triler"],
    "backdrops": [
      "https://image.tmdb.org/t/p/original/..."
    ],
    "reviewIds": [
      {
        "id": "...",
        "body": "Odličan film!"
      }
    ]
  }
]
```

**Status kodovi:**
- `200 OK` - Uspešno

#### GET /api/v1/movies/{imdbId}
Vraća detalje o filmu prema IMDb ID-u.

**Path parametri:**
- `imdbId` (String) - IMDb ID filma (npr. "tt1234567")

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "imdbId": "tt1234567",
  "title": "Naziv filma",
  "releaseDate": "2024-01-01",
  "trailerLink": "https://www.youtube.com/watch?v=...",
  "poster": "https://image.tmdb.org/t/p/w500/...",
  "genres": ["Akcija", "Drama"],
  "backdrops": ["https://..."],
  "reviewIds": [...]
}
```

**Status kodovi:**
- `200 OK` - Uspešno
- `404 Not Found` - Film nije pronađen (vraća `null`)

### Recenzije

#### POST /api/v1/reviews
Kreira novu recenziju i povezuje je sa filmom.

**Request Body:**
```json
{
  "reviewBody": "Odličan film sa sjajnom glumom!",
  "imdbId": "tt1234567"
}
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "body": "Odličan film sa sjajnom glumom!"
}
```

**Status kodovi:**
- `201 Created` - Recenzija uspešno kreirana
- `400 Bad Request` - Neispravan zahtev

## 📊 Modeli podataka

### Movie

```java
{
  "id": ObjectId,              // MongoDB ObjectId
  "imdbId": String,            // IMDb ID filma
  "title": String,             // Naziv filma
  "releaseDate": String,       // Datum izlaska
  "trailerLink": String,       // Link ka traileru
  "poster": String,            // URL ka poster slici
  "genres": List<String>,      // Lista žanrova
  "backdrops": List<String>,   // Lista backdrop slika
  "reviewIds": List<Review>    // Lista povezanih recenzija
}
```

### Review

```java
{
  "id": ObjectId,              // MongoDB ObjectId
  "body": String               // Tekst recenzije
}
```

## 🏗️ Arhitektura

Aplikacija koristi **layered architecture** sa sledećim slojevima:

1. **Controller Layer** (`Controller/`)
   - Prima HTTP zahteve
   - Validira input
   - Poziva Service layer
   - Vraća HTTP odgovore

2. **Service Layer** (`Service/`)
   - Sadrži business logiku
   - Komunicira sa Repository layer
   - Obavlja validaciju i transformaciju podataka

3. **Repository Layer** (`Repository/`)
   - Extends `MongoRepository`
   - Pristupa bazi podataka
   - CRUD operacije

4. **Model Layer** (`Models/`)
   - Definiše entitete
   - MongoDB dokumenti
   - Lombok anotacije za getters/setters

### Flow zahtev → odgovor

```
HTTP Request
    ↓
Controller (validacija)
    ↓
Service (business logika)
    ↓
Repository (database operacije)
    ↓
MongoDB
    ↓
Response (JSON)
```

## 🧪 Testiranje

### Pokretanje testova

```bash
mvn test
```

### Pokretanje sa coverage reportom

```bash
mvn test jacoco:report
```

## 🐛 Rješavanje problema

### Problem: Ne može da se poveže sa MongoDB

**Rešenje:**
1. Proverite da li su environment varijable ispravno postavljene u `.env` fajlu
2. Proverite MongoDB Atlas Network Access - dodajte vašu IP adresu
3. Proverite da li su credentials ispravni
4. Proverite connection string format

### Problem: Port 8080 je zauzet

**Rešenje:**
Dodajte u `application.properties`:
```properties
server.port=8081
```

### Problem: CORS greške

**Rešenje:**
Proverite `Config/CorsConfig.java` i ažurirajte allowed origins sa URL-om vašeg frontend-a.

## 📝 Dodatne napomene

- Aplikacija koristi **Lombok** za automatsko generisanje getters, setters, konstruktora
- **Spring Dotenv** se koristi za učitavanje environment varijabli iz `.env` fajla
- **DocumentReference** se koristi za povezivanje Review entiteta sa Movie entitetom
- Aplikacija podržava **hot reload** kroz Spring Boot DevTools

## 👨‍💻 Autor

**Ibrahim Bišić**



