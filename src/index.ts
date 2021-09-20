import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mysql from 'mysql2';
import * as dotenv from 'dotenv';
import { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLList, GraphQLID, parse, GraphQLInt } from 'graphql';
import Movie from './Schema/Types/Movie';
import * as queries from './Database';
import Serie from './Schema/Types/Serie';
import { findAllSeries, findSerieById, findUserByUsername, careerByActorId } from './Database/Queries';
import User from "./Schema/Types/User";
import * as bcrypt from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from './constants';

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
          console.log(series)
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
    },
    me: {
      type: User,
      args: {
        username:{
          type: GraphQLString
        }
      },
      resolve(_, args) {
        if (!args.username) {
          return null;
        }
        return findUserByUsername(db,args.username).then(user => {
          console.log(user)
          console.log("isoké")
          return user;
        }).catch(err => console.error(err)); 
      }
    },
    login: {
      type: GraphQLString,
      args: {
        username:{
          type: GraphQLString
        },
        password:{
          type: GraphQLString
        }
      },
      resolve(_,args){
        return findUserByUsername(db,args.username).then(async user => {
          if (!user) {
            return null;
          }
          //const valid = await bcrypt.compare(args.password, user.password);
          if (args.password != user.password) {
            return null;
          }
          const accessToken = sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
            expiresIn: "15min"
          });
          console.log(accessToken)
          return accessToken;
        })
      }
    },
    career: {
      type: new GraphQLList(GraphQLString),
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve(parent, args) {
        if(!args.name) return;
        return careerByActorId(db, args.name).then(career => {
          return career;
        });
      }
    }
  },
});

const schema = new GraphQLSchema({query: queryType});

app.use((req, _, next) => {
  //console.log(req)
  /*const accessToken = req.cookies["access-token"];
  try {
    const data = verify(accessToken, ACCESS_TOKEN_SECRET) as any;
    (req as any).userId = data.userId;
  } catch {}*/
  next();
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

app.use('/', (_, res) => {
  res.redirect('/graphql');
});

app.listen(port);
console.log(`Server listening on port ${port}`);