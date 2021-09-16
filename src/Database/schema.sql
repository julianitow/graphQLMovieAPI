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

CREATE TABLE IF NOT EXISTS HasProduced (
    producer_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (producer_id) REFERENCES Producers(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);

CREATE TABLE IF NOT EXISTS AppearedIn (
    actor_id INT NOT NULL,
    movie_id INT NOT NULL,
    FOREIGN KEY (actor_id) REFERENCES Actors(id),
    FOREIGN KEY (movie_id) REFERENCES Movies(id)
);