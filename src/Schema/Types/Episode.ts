import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInt } from 'graphql';
import Media from '../Interfaces/Media';
import Actor from './Actor';
import Producer from './Producer';


export default new GraphQLObjectType({
    name: 'Episode',
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
        synopsis: {
            type: GraphQLString
        },
        distribution: {
            type: new GraphQLList(Actor)
        },
        nb_episode: {
            type: GraphQLInt!
        },
        producer: {
            type: Producer
        }
    }
});