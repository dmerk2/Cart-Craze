const { User, Product, Category, Order } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {},
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { user, token };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(passord);
      if (!correctPw) {
        throw AuthenticationError;
      }
      const token = signToken(user);
      return { user, token };
    },
  },
};

module.exports = resolvers;