// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`

type Thought {
  _id: ID
  thoughtText: String
  createdAt: String
  username: String
  reactionCount: Int
  reactions: [Reaction]
}

type Reaction {
    _id: ID
    reactionBody: String
    createdAt: String
    username: String
  }

type Pokemon {
  _id: ID
  pokemonName: String
  username: String
  level: Int
}

type User {
  _id: ID
  username: String
  email: String
  friendCount: Int
  gymBadges: Int
  pokeDexCompletion: Int
  adventureStart: String
  currentTeam: [Pokemon]
  thoughts: [Thought]
  friends: [User]
}

type Auth {
  token: ID!
  user: User
}

type Query {
  me: User
  users: [User]
  user(username: String!): User
  thoughts(username: String): [Thought]
  thought(_id: ID!): Thought
  pokemons(username: String): [Pokemon]
  pokemon(_id: ID!): Pokemon
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!, 
      pokeDexCompletion:Int, gymBadges: Int, adventureStart: String): Auth
    addThought(thoughtText: String!): Thought
    addReaction(thoughtId: ID!, reactionBody: String!): Thought
    addFriend(friendId: ID!): User
    addPokemon(pokemonName: String!, level: Int): Pokemon
    removePokemon(pokemonId: ID!):User
    }
    
`;



// export the typeDefs
module.exports = typeDefs;