import { GraphQLID, GraphQLInterfaceType, GraphQLString, GraphQLList } from 'graphql';
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
        }
    })
});