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
        firstname: {
            type: GraphQLString!
        },
        lastname: {
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
        role: {
            type: GraphQLString!
        }
    },
});