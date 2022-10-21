const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    password: String
  }

  type Data {
    date: String
    btcPrice: Float
    walletBalance: Float
    longWins: Int
    longLosses: Int
    shortWins: Int
    shortLosses: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    me: User
    data: [Data]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    login(email: String!, password: String!): Auth
    addData(
      date: String!
      btcPrice: Float!
      walletBalance: Float!
      longWins: Int!
      longLosses: Int!
      shortWins: Int!
      shortLosses: Int!
    ): Data
  }
`;

module.exports = typeDefs;
