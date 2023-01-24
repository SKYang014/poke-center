const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));
const { faker } = require('@faker-js/faker');

const db = require('../config/connection');
const { Thought, User, Pokemon, PokeDB } = require('../models');
const pokeApi = "https://pokeapi.co/api/v2/pokemon/"
const pokeApiDesc = "https://pokeapi.co/api/v2/pokemon-species/"
db.once('open', async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});
  await Pokemon.deleteMany({});
  await PokeDB.deleteMany({});

  if (!PokeDB) {
    for (let i = 252; i < 386; i++) {

      let pokeDexId = i
      const pokeDesc = (id, cb) => {
        fetch(pokeApiDesc + id)
          .then(res => res.json())
          .then(json => {
            cb(json.flavor_text_entries[5].flavor_text)
          })
      }
      const loadPokemon = (id, cb) => {
        fetch(pokeApi + id)
          .then(res => res.json())
          .then(data => {
            cb(data)
          })
      }


      pokeDesc(pokeDexId, (poke) => {

        let description = poke.replace(/\r\n|\r|\n/gi, " ");
        loadPokemon(pokeDexId, async (pokemon) => {

          const species = pokemon.name;
          const photo = pokemon.sprites.front_default
          const shinyPhoto = pokemon.sprites.front_shiny
          const bigPhoto = pokemon.sprites.other.dream_world.front_default;


          const createdPoko = await PokeDB.create({ species, photo, shinyPhoto, bigPhoto, description, pokeDexId })
          // console.log(createdPoko)
        })
        return poke
      })
    }
  }

  // create user data
  const userData = [];

  for (let i = 0; i < 20; i += 1) {
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
    const createdAt = faker.date.between('2022-01-01T00:00:00.000Z', '2023-01-01T00:00:00.000Z');
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
  for (let i = 0; i < 50; i += 1) {

    //rand poke id generator
    const pokeDexId = faker.mersenne.rand(386, 252);
    //first call for desc
    const descriptionCall = await fetch(pokeApiDesc + pokeDexId)
      .then(function (data) { return data.json(); }
      ).then(function (json) {
        return json.flavor_text_entries[5].flavor_text;
      }
      )
    const description = descriptionCall.replace(/\r\n|\r|\n/gi, " ")

    //second call for general poke info

    let photo = ""

    const createPokemon = async (poke) => {


      const level = faker.mersenne.rand(100, 1);
      const pokemonName = faker.name.lastName();
      const species = poke.name;
      const shiny = faker.datatype.boolean();//if true, photo = shiny/special  if false= normal
      let photo = poke.sprites.front_default
      if (shiny) {
        photo = poke.sprites.front_shiny
      }
      // maybe use read//update one

      const bigPhoto = poke.sprites.other.dream_world.front_default;

      const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
      const { username, _id: userId } = createdUsers.ops[randomUserIndex];

      const createdPokemon = await Pokemon.create({ pokemonName, level, username, species, pokeDexId, shiny, photo, bigPhoto, description });

      const updatedUser = await User.updateOne(
        { _id: userId },
        { $push: { currentTeam: createdPokemon._id } }
      );
      console.log(createdPokemon)
      createdPokemons.push(createdPokemon);
    }

    await fetch(pokeApi + pokeDexId)
      .then(function (data) { return data.json(); }
      ).then(function (json) {
        createPokemon(json);
      }
      )
  }






  console.log('all done!');
  process.exit(0);
});
