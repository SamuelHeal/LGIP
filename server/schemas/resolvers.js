const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Data } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { email }) => {
      return User.findOne({ email });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    data: async (parent, args, context) => {
      return Data.find();
    },
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      const exisiting = await User.findOne({ email });

      if (exisiting) {
        throw new AuthenticationError(
          'An account with these credentials already exists'
        );
      }

      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with these credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('No user found with these credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addData: async (
      parent,
      {
        date,
        btcPrice,
        walletBalance,
        longWins,
        longLosses,
        shortWins,
        shortLosses,
      }
    ) => {
      const data = await Data.create({
        date,
        btcPrice,
        walletBalance,
        longWins,
        longLosses,
        shortWins,
        shortLosses,
      });

      return { data };
    },
  },
};

module.exports = resolvers;
