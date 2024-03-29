const { AuthenticationError } = require("apollo-server-express");
const { User} = require('../models'); // Assuming you have User and Book models
const { signToken } = require('../utils/auth'); // Your authentication utility

const resolvers = {
  Query: {
    // Get a single user by ID or currently logged in user
    user: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new Error('Not logged in');
    },

    // ... other queries like fetching books ...
  },
  Mutation: {
    // Sign up a new user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    // User login
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    // Save a book to a user's account
    saveBook: async (parent, { bookData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: bookData } },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error('Not logged in');
    },

    // Remove a book from a user's account
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new Error('Not logged in');
    },

    // ... other mutations ...
  },

  // ... (Optional) Type resolvers for custom types ...
};

module.exports = resolvers;
