const { User, Thought, Pokemon } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('thoughts')
                    .populate('currentTeam')
                    .populate('friends');

                return userData;
            }

            throw new AuthenticationError('Not logged in');
        },
        thoughts: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        // place this inside of the `Query` nested object right after `thoughts`
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
                .populate('currentTeam');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts')
                .populate('currentTeam');
        },
        pokemons: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Pokemon.find(params).sort({ createdAt: -1 });
        },
        pokemon: async (parent, { _id }) => {
            return Pokemon.findOne({ _id });
        },
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addThought: async (parent, args, context) => {
            if (context.user) {
                const thought = await Thought.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { thoughts: thought._id } },
                    { new: true }
                );

                return thought;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addPokemon: async (parent, args, context) => {
            if (context.user) {
                const pokemon = await Pokemon.create({ ...args, username: context.user.username });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { currentTeam: pokemon._id } },
                    { new: true }
                );

                return pokemon;
            }
            // if (context.user.currentTeam >= 6) {
            //     throw new AuthenticationError('You have too many pokemon in your team!');
            // }

            throw new AuthenticationError('You need to be logged in!');
        },
        removePokemon: async (parent, args, context) => {
            if (context.user) {
                // console.log(args.pokemonId)
                const changedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { currentTeam: args.pokemonId } },
                    { new: true }
                ).populate('currentTeam');
                // const pokemon = await Pokemon.create({ ...args, username: context.user.username });

                return changedUser;
            }
            // if (context.user.currentTeam > 1) {
            //     throw new AuthenticationError(`You don't have any pokemon in your team!`);
            // }

            throw new AuthenticationError('You need to be logged in!');
        },
        addReaction: async (parent, { thoughtId, reactionBody }, context) => {
            if (context.user) {
                const updatedThought = await Thought.findOneAndUpdate(
                    { _id: thoughtId },
                    { $push: { reactions: { reactionBody, username: context.user.username } } },
                    { new: true, runValidators: true }
                );

                return updatedThought;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addFriend: async (parent, { friendId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { friends: friendId } },
                    { new: true }
                ).populate('friends');

                return updatedUser;
            }

            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;