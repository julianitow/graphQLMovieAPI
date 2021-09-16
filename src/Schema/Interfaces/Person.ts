import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLInterfaceType, GraphQLList } from 'graphql';
import Media from './Media';

export default new GraphQLInterfaceType({
    name: 'Person',
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