USE graphql;

#Inception

INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1977-9-10", "Tom", "Hardy", "British");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1974-11-11", "Leonardo", "DiCaprio", "American");
INSERT INTO Producers (birthday, firstname, lastname, nationnality)
VALUES ("1970-7-30", "Christopher", "Nolan", "British");

INSERT INTO Movies (original_title, international_title)
VALUES ("Inception", "Inception");

INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (1, 1);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (2, 1);

INSERT INTO HasProduced (movie_id, producer_id)
VALUES (1, 1);

# The Gentlemen
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1990-4-10", "Charlie", "Hunman", "British");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1976-5-31", "Colin", "Farrell", "Irish");
INSERT INTO Producers (birthday, firstname, lastname, nationnality)
VALUES ("1968-9-10", "Guy", "Ritchie", "British");

INSERT INTO Movies (original_title, international_title)
VALUES ("The Gentlemen", "the Gentlemen");

INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (3, 2);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (4, 2);

INSERT INTO HasProduced (movie_id, producer_id)
VALUES (2, 2);

#Spiderman - Homecoming
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1996-6-1", "Tom", "Holland", "British");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1951-9-5", "Mickael", "Keaton", "American");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1965-4-4", "Robert", "Downey Jr.", "American");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1964-12-4", "Marisa", "Tomei", "American");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1996-9-1", "Zendaya", "Coleman", "American");
INSERT INTO Producers (birthday, firstname, lastname, nationnality)
VALUES ("1981-6-28", "Jon", "Watt", "British");

INSERT INTO Movies (original_title, international_title)
VALUES ("Spider-man: Homecoming", "Spider-man: Homecoming");

INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (5, 3);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (6, 3);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (7, 3);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (8, 3);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (9, 3);

INSERT INTO HasProduced (movie_id, producer_id)
VALUES (3, 3);