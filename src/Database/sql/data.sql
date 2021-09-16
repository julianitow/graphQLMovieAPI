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

# Charlie and the Chocolate Factory
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1963-4-9", "Johnny", "Depp", "American");
INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1992-2-14", "Freddie", "Highmore", "British");
INSERT INTO Producers (birthday, firstname, lastname, nationnality)
VALUES ("1958-8-25", "Tim", "Burton", "American");

INSERT INTO Movies (original_title, international_title)
VALUES ("Charlie and the Chocolate Factory", "Charlie and the Chocolate Factory");

INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (3, 2);
INSERT INTO AppearedIn (actor_id, movie_id)
VALUES (4, 2);

INSERT INTO HasProduced (movie_id, producer_id)
VALUES (2, 2);

#
# TV Shows
#

#Peaky blinders

INSERT INTO Series (original_title, international_title)
VALUES ("Peaky Blinders", "Peaky Blinders");

INSERT INTO Seasons (original_title, international_title, synopsis, nb_season, serie_id)
VALUES("Series 1", "Series 1", "Peaky Blinders is a British period crime drama television series 
created by Steven Knight. Set in Birmingham, England, the series follows the exploits of the Shelby crime 
family in the direct aftermath of the First World War. The fictional family is loosely based on a real urban 
youth gang of the same name, who were active in the city from the 1890s to the early 20th century.",
1, 1);

INSERT INTO Episodes (original_title, international_title, synopsis, nb_episode, season_id)
VALUES ("Episode 1", "Episode 1", 
"In 1919 following the Great War, the Peaky Blinders, led by Thomas 'Tommy' Shelby, 
a decorated former sergeant major, appropriate a consignment of guns from the local arms factory. 
Winston Churchill sends Inspector Campbell to Birmingham to retrieve the guns. Tommy's aunt Polly urges 
Tommy to return the guns, but he feels that he can use them to his advantage. His brother 
Arthur does not agree with Tommy about fixing horse races, 
believing it will cause trouble with Billy Kimber, who runs the races. 
Inspector Campbell and his men capture Arthur and beat him while inquiring about the gun robbery.
 Campbell propositions Arthur and the gang to work with him to find the guns. Tommy's sister Ada is involved 
 with Freddie Thorne, a communist. A barmaid named Grace Burgess starts working at the Garrison, a bar owned by
  the Peaky Blinders. She has been placed in Birmingham by Campbell to help find 
the guns. Tommy's friend Danny has a PTSD episode and kills an Italian business owner. To avoid a war with the Italians, 
Tommy agrees to kill Danny, with the Italians witnessing. However, Danny's death is faked and he goes to London on a special 
assignment.",
1, 1);

INSERT INTO Actors (birthday, firstname, lastname, nationnality)
VALUES ("1976-5-25", "Cilian", "Murphy", "Irish");

INSERT INTO Producers (birthday, firstname, lastname, nationnality)
VALUES ("1969-1-01", "David", "Caffrey", "Irish");

INSERT INTO AppearedIn (actor_id, serie_id)
VALUES (5, 1);

INSERT INTO HasProduced(producer_id, serie_id)
VALUES (3, 1);
