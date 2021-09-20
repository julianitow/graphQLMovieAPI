import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import Media from '../Interfaces/Media';
import Person from '../Interfaces/Person';

export default new GraphQLObjectType({
    name: 'Actor',
    interfaces: [Person],
    fields: {
        id: {
            type: GraphQLID!
        },
        birthday: {
            type: GraphQLString!
        },
        name: {
            type: GraphQLString!
        },
        nationnality: {
            type: GraphQLString!
        },
        career: {
            type: new GraphQLList(GraphQLString)!
        },
        greetings: {
            type: new GraphQLList(GraphQLString)!
        },
        picture: {
            type: GraphQLString!
        },
        role: {
            type: GraphQLString!
        },
        poster: {
            type: GraphQLString!
        },
    },
});