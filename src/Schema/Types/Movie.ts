import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLObjectType } from 'graphql';
import Media from '../Interfaces/Media';
import Actor from './Actor';
import Producer from './Producer';


export default new GraphQLObjectType({
    name: 'Movie',
    interfaces: [Media],
    fields: {
        id: {
            type: GraphQLID!
        },
        original_title: {
            type: GraphQLString!
        },
        international_title: {
            type: GraphQLString!
        },
        distribution: {
            type: new GraphQLList(Actor)
        },
        producer: {
            type: Producer
        }
    }
});