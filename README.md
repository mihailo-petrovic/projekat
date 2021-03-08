# Projekat: Moje Liste Filmova

Ovo je završni projekat kursa za Front End developera na Code akademiji.
Projekat koristi The Movie Database (TMDB) API za izvlačenje podataka o filmovima. 

Plan rada aplikacije:

1. Korisnik na početku mora da se uloguje koristeći svoj username i password, a ako ih još nije napravio, treba prvo da se registruje, a zatim da se uloguje. Svi korisnički podaci se čuvaju u local storage-u, koji u ovoj aplikaciji simulira bazu za sve podatke koje korisnik sačuva.
2. Nakon logovanja, korisnik dolazi na svoju početnu stranu, gde mu se prikazuju liste filmova u različitim kategorijama (omiljeni, za gledanje, ocenjeni itd). Novim korisnicima će na početku ove liste biti prazne.
3. Korisnik može da pretražuje filmove dostupne u TMDB-u kako bi ih čuvao i raspoređivao u određene kategorije.
4. Svi filmovi se čuvaju kao objekti (u JSON formatu), koji se prepoznaju po svojim TMDB ID oznakama u local storage-u.
5. Korisnik svaki sačuvani objekat o filmu u nekoj kategoriji može da obriše, kao i da ponovo oceni ili izmeni na neki drugi način, nakon čega se u "bazi" menja ili briše određeni objekat.
6. Na kraju, korisnik može da se izloguje, što ga vraća na stranu za logovanje, gde mu više nisu dostupni podaci o svim filmovima koje je čuvao.

# Project: My Movie Lists

This is my final project for the Code Academy Front End Developer course.
The project uses The Movie Database (TMDB) API for extracting data about movies.

App workflow:

1. In the beginning, the user has to log in using his own username and password. If he didn't make them yet, firstly he should register, and than log in. All user data is stored in the local storage, which simulates the database in this app for all data that the user saves.
2. After login, the user is on his homepage, where he is presented with the lists of movies in different categories (favourites, watch later, rated etc). New users won't have any saved data, hence these lists will be empty.
3. The user can search movies available on TMDB, so he can store and categorize them.
4. All movies are saved as objects (JSON format), which are differed by their TMDB IDs, in local storage.
5. The user is able to delete, rate again or change in some other way, every saved movie object, after which the specified objet is changed or removed from "the database".
6. In the end, the user can log out, which puts him back on the login page, where all the data about movies he saved is not available anymore.
