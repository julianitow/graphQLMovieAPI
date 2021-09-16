import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInt } from 'graphql';
import Media from '../Interfaces/Media';
import Actor from './Actor';
import Episode from './Episode';
import Producer from './Producer';


export default new GraphQLObjectType({
    name: 'Season',
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
        synopsis: {
            type: GraphQLString
        },
        episodes: {
            type: new GraphQLList(Episode)
        },
        nb_season: {
            type: GraphQLInt!
        },
        producer: {
            type: Producer
        }
    }
});