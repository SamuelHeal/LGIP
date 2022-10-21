import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      firstName
      email
    }
  }
`;

export const QUERY_DATA = gql`
  query data {
    data {
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
