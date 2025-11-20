🎬 Filmovi – REST API aplikacija

Filmovi je jednostavan i modularan Spring Boot REST API za upravljanje filmovima i njihovim recenzijama.
Aplikacija omogućava pregled filmova, dodavanje novih filmova, te dodavanje i prikaz korisničkih recenzija.

//Napomena!!!!
Trenutno je urađen samo backend dio aplikacije te uskoro radim i frontend
🚀 Korištene tehnologije

Backend aplikacija koristi sljedeće tehnologije:

Java 25
Spring Boot
Spring Web
Spring Data JPA / MongoDB
Lombok
Maven

📁 Struktura projekta

Glavni backend dio se nalazi u folderu:

Filmovi/
 └── backend/
      └── Filmovi/
          ├── src/main/java/me/ibrahimbisic/Filmovi
          │    ├── Controller/
          │    │     ├── MovieController.java
          │    │     └── ReviewController.java
          │    ├── Models/
          │    │     ├── Movie.java
          │    │     └── Review.java
          │    ├── Repository/
          │    │     ├── MovieRepository.java
          │    │     └── ReviewRepository.java
          │    └── Service/
          │          ├── MovieService.java
          │          └── ReviewService.java
          └── pom.xml

🧠 Funkcionalnosti

🎞 Filmovi

Pregled svih filmova
Pregled pojedinačnog filma
Dodavanje novih filmova
Pretraga filmova

⭐ Recenzije

Dodavanje recenzija filmovima
Pregled postojećih recenzija
Struktura projekta (Controller → Service → Repository) omogućava jasnu podjelu logike i jednostavnije održavanje.


📡 API rute
Filmovi
Metoda	Ruta	Opis
GET	/api/movies	Vraća sve filmove
GET	/api/movies/{id}	Vraća film prema ID-u
POST	/api/movies	Dodaje novi film
Recenzije
Metoda	Ruta	Opis
POST	/api/reviews	Kreira novu recenziju

Ako želiš, mogu ti generisati i automatsku Swagger/OpenAPI dokumentaciju.

Aplikacija će biti dostupna na:

👉 http://localhost:8080

🗄️ Baza podataka

Aplikacija koristi MongoDB Atlas kao bazu podataka.
Povezivanje se podešava u application.properties.

👨‍💻 Autor

Ibrahim Bišić
