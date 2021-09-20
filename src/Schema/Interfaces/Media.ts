import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList, GraphQLFloat } from 'graphql';
import Person from './Person';


export default new GraphQLInterfaceType({
    name: 'Media',
    fields: () => ({
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
            type: new GraphQLList(Person)
        },
        poster: {
            type: GraphQLString!
        },
        sinopsis: {
            type: GraphQLString!
        },
        rate: {
            type: GraphQLFloat!
        },
        release_date: {
            type: GraphQLString!
        },
    })
});