# RIGHTS 

CREATE DATABASE IF NOT EXISTS graphql;

# CREATE USER 'graphql'@'%' IDENTIFIED BY 'graphql';

# GRANT ALL PRIVILEGES ON graphql.* TO 'graphql'@'%';

# FLUSH PRIVILEGES;

USE graphql;

DROP TABLE IF EXISTS AppearedIn;

DROP TABLE IF EXISTS HasProduced;

DROP TABLE IF EXISTS Actors;
DROP TABLE IF EXISTS Movies;

DROP TABLE IF EXISTS Series;

DROP TABLE IF EXISTS Seasons;

DROP TABLE IF EXISTS Episodes;

CREATE TABLE IF NOT EXISTS Actors (
    ID INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    birthday DATE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    nationnality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Producers (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    birthday DATE,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    nationnality VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Movies (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    original_title VARCHAR(100),
    international_title VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Series (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    original_title VARCHAR(100),
    international_title VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Seasons (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    original_title VARCHAR(100),
    international_title VARCHAR(100),
    synopsis TEXT,
    nb_season INT NOT NULL,
    serie_id INT NOT NULL,
    FOREIGN KEY (serie_id) REFERENCES Series(id)
);

CREATE TABLE IF NOT EXISTS Episodes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    original_title VARCHAR(100),
    international_title VARCHAR(100),
    synopsis TEXT,
    nb_episode INT NOT NULL,
    season_id INT NOT NULL,
    FOREIGN KEY (season_id) REFERENCES Seasons(id)
);

CREATE TABLE IF NOT EXISTS HasProduced (
    producer_id INT NOT NULL,
    movie_id INT,
    serie_id INT,
    FOREIGN KEY (producer_id) REFERENCES Producers(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id),
    FOREIGN KEY (serie_id) REFERENCES Series(id)
);

CREATE TABLE IF NOT EXISTS AppearedIn (
    actor_id INT NOT NULL,
    movie_id INT,
    serie_id INT,
    FOREIGN KEY (actor_id) REFERENCES Actors(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id),
    FOREIGN KEY (serie_id) REFERENCES Series(id)
);