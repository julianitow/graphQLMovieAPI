import mysql, { RowDataPacket } from 'mysql2';

interface Media {
    original_title: String,
    international_title: String,
    sinopsis: String,
    distribution: Actor[],
    producer_id?: number,
    producer?: Producer,
    release_date: string,
};

class Episode implements Media {
    release_date: string;
    original_title: String;
    international_title: String;
    distribution: Actor[];
    producer_id?: number;
    producer?: Producer;
    sinopsis: String;
    nb_episode: number;
};

class Season implements Media {
    release_date: string;
    original_title: String;
    international_title: String;
    sinopsis: String;
    distribution: Actor[];
    producer_id?: number;
    producer?: Producer;
    nb_season: number;
    episodes: Episode[];
}

class Movie implements Media {
    release_date: string;
    original_title: String;
    international_title: String;
    sinopsis: String;
    distribution: Actor[];
    producer_id?: number;
    producer?: Producer;
};

class Serie implements Media {
    release_date: string;
    original_title: String;
    international_title: String;
    sinopsis: String;
    distribution: Actor[];
    producer_id?: number;
    producer?: Producer;
    seasons: Season[]
}

interface Person {
    birthday: string,
    name: String,
    nationnality: String,
    career: String[],
    greetings: String[],
    role: String
}

class Actor implements Person {
    birthday: string;
    name: String;
    nationnality: String;
    career: String[];
    greetings: String[];
    role: String;
}

class Producer implements Person {
    birthday: string;
    name: String;
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
        "SELECT actors.id, birthday, name, picture FROM Actors " +
        "JOIN AppearedIn ap ON ap.actor_id = actors.id " +
        "JOIN Movies on movies.id = ap.movie_id " +
        "WHERE movies.id = ?"
        const actors: Actor[] = [];
        db.query(queryString, [movieId.toString()], (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            if(rows === undefined) return;
            rows.forEach(row => {
                const actor = row as Actor;
                actor.birthday = formatDate(actor.birthday);
                actors.push(actor);
            });
            resolve(actors);
        });
    });
};

function formatDate(date2format: string): string {
    const date = new Date(date2format);
    const year = date.getFullYear();
    const month = date.getMonth() > 9 ? date.getMonth() : `0${date.getMonth()}`;
    const day = date.getDay() > 9 ? date.getDay() : `0${date.getDay()}`;
    const dateResult = `${year}-${month}-${day}`;
    return dateResult;
};

export const findAllMovies = (db: mysql.Connection): Promise<Movie[]> => {
    return new Promise<Movie[]>((resolve, reject) => {
        //const queryString = "select * from movies join AppearedIn ap on ap.movie_id = movies.id join actors a on a.id = ap.actor_id join hasProduced hp on hp.movie_id = movies.id join producers p on p.id = hp.producer_id";
        const queryString = 
        "SELECT distinct(id), original_title, international_title, poster, rate, release_date, sinopsis " + 
        "FROM Movies";
        let movies: Movie[] = [];
        db.query(queryString, (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            new Promise<any>((resolve, reject) => { 
                rows.forEach(row => {
                    const movie = row as Movie;
                    findActorsByMovieId(db, row.id).then((actors) => {
                        movie.distribution = actors;
                        movie.release_date = formatDate(movie.release_date);
                        movies.push(movie);
                    }).catch(err => reject(err));
                    /*findProducerByid(db, movie.producer_id)
                    .then(producer => {
                        movie.producer = producer;
                        movies.push(movie);
                    })
                    .catch(err => reject(err));*/
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
        const queryString = "SELECT distinct(id), original_title, international_title, sinopsis, nb_season, rate, release_date FROM Seasons " +
        "WHERE serie_id = ?";
        const seasons: Season[] = [];
        db.query(queryString, [serieId], (err, result) => {
            if(err) reject(err);
            const rows = result as RowDataPacket[];
            console.log("ROWS", rows);
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
        const queryString = "SELECT distinct(id), original_title, international_title " + 
        "FROM Series "/*JOIN HasProduced ON series.id = HasProduced.serie_id "*/;
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
                        series.push(serie);
                    }).catch(err => reject(err));
                    /*findProducerByid(db, serie.producer_id)
                    .then(producer => {
                        serie.producer = producer;
                        series.push(serie);
                    })
                    .catch(err => reject(err));*/
                });
                setTimeout(() => { resolve(true) }, 1000);
            }).then(() => {
                resolve(series);
            });
        })
    });
};

export const findSerieById = (db: mysql.Connection, id: number): Promise<Serie> => {
    return new Promise<Serie>((resolve, reject) => {
        const queryString = "SELECT original_title, international_title, sinopsis, release_date, rate FROM Series ";
        db.query(queryString, [id.toString()], (err, result) => {
            if (err) reject(err);
            const rows = result as RowDataPacket[];
            const serie = rows[0] as Serie;
            findSeasonsBySerieId(db, id)
            .then((seasons) => {
                serie.seasons = seasons
                new Promise<boolean>((resolve, reject) => {
                    seasons.forEach(season => {
                        if(!(season as any).id) return;
                        findEpisodesBySeasonId(db, (season as any).id)
                        .then(episodes => {
                            season.episodes = episodes;
                        }).catch(err => reject(err));
                    });
                });
            }).then(() => resolve(serie))
            .catch(err => reject(err));
        });
    }); 
};

export const findMediaByName = (db: mysql.Connection, name: String): Promise<any> => {
    return new Promise<any>(() => {});
} 

//TODO Carreer
// select movies.original_title from movies join appearedin ap on ap.movie_id = movies.id join actors on ap.actor_id = actors.id where actors.name = "Samir Decazza";