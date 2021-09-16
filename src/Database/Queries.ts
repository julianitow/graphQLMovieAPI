import mysql, { RowDataPacket } from 'mysql2';

interface Season {
    original_title: String,
    international_title: String,
    synopsis: String,
    distribution: Actor[],
    producer_id?: number,
    producer?: Producer,
    nb_season: number,
    episodes: Episode[]
}

interface Episode {
    original_title: String,
    international_title: String,
    synopsis: String,
    distribution: Actor[],
    producer_id?: number,
    producer?: Producer
    nb_episode: number,
}

interface Serie {
    original_title: String,
    international_title: String,
    synopsis: String,
    distribution: Actor[],
    producer_id?: number,
    producer?: Producer,
    seasons: Season[]
}

interface Movie {
    original_title: String,
    international_title: String,
    distribution: Actor[],
    producer_id?: number,
    producer?: Producer
} 

interface Person {
    birthday: String,
    firstname: String,
    lastname: String,
    nationnality: String,
    career: String[],
    greetings: String[],
    role: String
}

class Actor implements Person {
    birthday: String;
    firstname: String;
    lastname: String;
    nationnality: String;
    career: String[];
    greetings: String[];
    role: String;
}

class Producer implements Person {
    birthday: String;
    firstname: String;
    lastname: String;
    nationnality: String;
    career: String[];
    greetings: String[];
    role: String;
}

export const findProducerByid = (db: mysql.Connection, producerId: number): Promise<Producer> => {
    return new Promise<Producer>((resolve, reject) => {
        const queryString = "SELECT birthday, firstname, lastname, nationnality FROM Producers WHERE id = ?";
        db.query(queryString, [producerId.toString()], (err, result) => {
            if(err) reject(err);
            const producer = result[0] as Producer;
            resolve(producer);
        });
    });
};

export const findActorById = (db: mysql.Connection, actorId: number): Promise<Actor> => {
    return new Promise<Actor>((resolve, reject) => {

    });
}

export const findActorsByMovieId = (db: mysql.Connection, movieId: number): Promise<Actor[]> => {
    return new Promise<Actor[]>((resolve, reject) => {
        const queryString = 
        "SELECT actors.id, birthday, firstname, lastname FROM Actors " +
        "JOIN AppearedIn ap ON ap.actor_id = actors.id " +
        "JOIN Movies on movies.id = ap.movie_id " +
        "WHERE movies.id = ?"
        const actors: Actor[] = [];
        db.query(queryString, [movieId.toString()], (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            rows.forEach(row => {
                const actor = row as Actor;
                actors.push(actor);
            });
            resolve(actors);
        });
    });
}

export const findAllMovies = (db: mysql.Connection): Promise<Movie[]> => {
    return new Promise<Movie[]>((resolve, reject) => {
        //const queryString = "select * from movies join AppearedIn ap on ap.movie_id = movies.id join actors a on a.id = ap.actor_id join hasProduced hp on hp.movie_id = movies.id join producers p on p.id = hp.producer_id";
        const queryString = 
        "SELECT distinct(id), original_title, international_title, producer_id " + 
        "FROM Movies JOIN HasProduced ON movies.id = HasProduced.movie_id ";
        let movies: Movie[] = [];
        db.query(queryString, (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            new Promise<any>((resolve, reject) => { 
                rows.forEach(row => {
                    const movie = row as Movie;
                    findActorsByMovieId(db, row.id).then((actors) => {
                        movie.distribution = actors;
                    }).catch(err => reject(err));
                    findProducerByid(db, movie.producer_id)
                    .then(producer => {
                        movie.producer = producer;
                        movies.push(movie);
                    })
                    .catch(err => reject(err));
                });
                setTimeout(() => { resolve(true) }, 1000);
            }).then(() => {
                resolve(movies);
            });
        });
    });
};

export const findEpisodesBySeasonId = (db: mysql.Connection, seasonId: number): Promise<Episode[]> => {
    return new Promise<Episode[]>((resolve, reject) => {
        const queryString = "SELECT distinct(id), original_title, international_title, synopsis, nb_episode FROM Episodes " +
        "WHERE season_id = ?";
        const episodes: Episode[] = [];
        db.query(queryString, [seasonId.toString()], (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            new Promise<any>((resolve, reject) => {
                rows.forEach(row => {
                    const episode = row as Episode;
                    episodes.push(episode);
                });
                setTimeout(() => {resolve(true)}, 200);
            }).then(() => {
                resolve(episodes);
            })
        });
    });
};

export const findSeasonsBySerieId = (db: mysql.Connection, serieId: number): Promise<Season[]> => {
    return new Promise<Season[]>((resolve, reject) => {
        const queryString = "SELECT distinct(id), original_title, international_title, synopsis, nb_season FROM Seasons " +
        "WHERE serie_id = ?";
        const seasons: Season[] = [];
        db.query(queryString, [serieId.toString()], (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            new Promise<any>((resolve, reject) => {
                rows.forEach(row => {
                    const season = row as Season;
                    findEpisodesBySeasonId(db, row.id)
                    .then((episodes => {
                        season.episodes = episodes;
                    }))
                    .catch(err => reject(err));
                    seasons.push(season);
                });
                setTimeout(() => {resolve(true)}, 200);
            }).then(() => {
                resolve(seasons);
            })
        });
    });
};

export const findAllSeries = (db: mysql.Connection): Promise<Serie[]> => {
    return new Promise<Serie[]>((resolve, reject) => {
        const queryString = "SELECT distinct(id), original_title, international_title, producer_id " + 
        "FROM Series JOIN HasProduced ON series.id = HasProduced.serie_id ";
        const series: Serie[] = [];
        db.query(queryString, (err, result) => {
            if (err) reject(err);
            const rows = result as RowDataPacket[];
            new Promise<any>((resolve, reject) => { 
                rows.forEach(row => {
                    const serie = row as Serie;
                    findSeasonsBySerieId(db, row.id).then((seasons) => {
                        serie.seasons = seasons;
                    });
                    findActorsByMovieId(db, row.id).then((actors) => {
                        serie.distribution = actors;
                    }).catch(err => reject(err));
                    findProducerByid(db, serie.producer_id)
                    .then(producer => {
                        serie.producer = producer;
                        series.push(serie);
                    })
                    .catch(err => reject(err));
                });
                setTimeout(() => { resolve(true) }, 1000);
            }).then(() => {
                console.log(series);
                resolve(series);
            });
        })
    });
};