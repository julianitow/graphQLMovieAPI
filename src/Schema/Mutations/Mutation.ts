import { GraphQLInputObjectType, GraphQLObjectType, GraphQLString } from 'graphql';
import Movie from '../Types/Movie';

export const MovieInput = new GraphQLInputObjectType({
    name: 'MovieInput',
    fields: {
        title: {
            type: GraphQLString
        }
    },
});

export default new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addMovie: {
            type: Movie,
            args: {
                input: {
                    type: MovieInput
                }
            },
            resolve(parent, args, context, obj) {
                console.log(args.input.title);
            }
        }
    }
});