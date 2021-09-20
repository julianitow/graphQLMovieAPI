import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID } from 'graphql';
import Movie from './Schema/Types/Movie';
import * as queries from './Database';
import Serie from './Schema/Types/Serie';
import { findAllSeries, findSerieById } from './Database/Queries';

dotenv.config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movies: {
      type: new GraphQLList(Movie),
      resolve(parent, args) {
        return queries.findAllMovies(db).then(movies => {
          return movies;
        }).catch(err => {
          console.error(err);
        });
      }
    },
    movie: {
      type: Serie,
      args: {
        name: {
          type: GraphQLString,
          description: "Name of movie"
        }
      },
      resolve(parent, args, context, obj) {
        if(!args.name) return;

      }
    },
    series : {
      type: new GraphQLList(Serie),
      resolve(parent, args) {
        return findAllSeries(db).then(series => {
          return series;
        }).catch(err => console.error(err));
      }
    },
    serie: {
      type: Serie,
      args: {
        id: {
          type: GraphQLID,
          description: "An id"
        }
      },
      resolve(parent, args) {
        if(!args.id) return;
        return findSerieById(db, args.id).then(serie => {
          console.log(serie);
          return serie;
        }).catch(err => console.error(err)); 
      }
    },
    status: {
        type: GraphQLString,
        resolve(parent, args){
          return "Welcome to Movie API"
      }
    }
  }
});

const schema = new GraphQLSchema({query: queryType});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.use('/', (_, res) => {
  res.redirect('/graphql');
});

app.listen(port);
console.log(`Server listening on port ${port}`);