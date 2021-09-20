import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

export default new GraphQLObjectType({
    name: 'User',
    description: 'A simple user',
    fields: {
      id: {
        type: GraphQLID!,
      },
      username: {
        type: GraphQLString!,
      },
      password: {
        type: GraphQLString,
      },
    },
  })