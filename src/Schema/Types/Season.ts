import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLObjectType, GraphQLInt, GraphQLFloat } from 'graphql';
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
        sinopsis: {
            type: GraphQLString
        },
        episodes: {
            type: new GraphQLList(Episode)
        },
        nb_season: {
            type: GraphQLInt!
        },
        release_date: {
            type: GraphQLString!
        },
        rate: {
            type: GraphQLFloat!
        },
        producer: {
            type: Producer
        },
        poster: {
            type: GraphQLString!
        },
    }
});