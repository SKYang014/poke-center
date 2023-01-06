const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Thought, User, Pokemon } = require('../models');
const pokeApi = "https://pokeapi.co/api/v2/pokemon/"

db.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 10; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);
    const password = faker.internet.password();
    const gymBadges = faker.mersenne.rand(8, 0);
    const pokeDexCompletion = faker.mersenne.rand(202, 1);
    const adventureStart = faker.date.between('1996-02-27T00:00:00.000Z', '2023-01-01T00:00:00.000Z');

    userData.push({ username, email, password, gymBadges, pokeDexCompletion, adventureStart });
  }

  const createdUsers = await User.collection.insertMany(userData);

  // create friends
  for (let i = 0; i < 100; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { _id: userId } = createdUsers.ops[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      friendId = createdUsers.ops[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create thoughts
  let createdThoughts = [];
  for (let i = 0; i < 100; i += 1) {
    const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdThought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdThought._id } }
    );

    createdThoughts.push(createdThought);
  }

  // create reactions
  for (let i = 0; i < 100; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username } = createdUsers.ops[randomUserIndex];

    const randomThoughtIndex = Math.floor(Math.random() * createdThoughts.length);
    const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    await Thought.updateOne(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  // create pokemon
  let createdPokemons = [];
  for (let i = 0; i < 20; i += 1) {
    const pokeid = faker.mersenne.rand(386, 252);
    const poke = await fetch(pokeApi + pokeid)
      .then(function (data) { return data.json(); }
      ).then(function (json) {
        return json.name;
      }
      )
    const level = faker.mersenne.rand(100, 1);

    const pokemonName = poke;

    const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
    const { username, _id: userId } = createdUsers.ops[randomUserIndex];

    const createdPokemon = await Pokemon.create({ pokemonName, level, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { currentTeam: createdPokemon._id } }
    );
    console.log(createdPokemon)
    createdPokemons.push(createdPokemon);
  }

  console.log('all done!');
  process.exit(0);
});
