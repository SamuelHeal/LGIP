import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_DATA = gql`
  mutation addData(
    $date: String!
    $btcPrice: Float!
    $walletBalance: Float!
    $longWins: Int!
    $longLosses: Int!
    $shortWins: Int!
    $shortLosses: Int!
  ) {
    addData(
      date: $date
      btcPrice: $btcPrice
      walletBalance: $walletBalance
      longWins: $longWins
      longLosses: $longLosses
      shortWins: $shortWins
      shortLosses: $shortLosses
    ) {
      date
      btcPrice
      walletBalance
      longWins
      longLosses
      shortWins
      shortLosses
    }
  }
`;
