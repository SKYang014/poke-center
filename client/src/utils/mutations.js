import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $gymBadges: Int, $pokeDexCompletion: Int) {
        addUser(username: $username, email: $email, password: $password, gymBadges:$gymBadges, pokeDexCompletion: $pokeDexCompletion) {
            token
            user {
                _id
                username
            }
        }
    }`
  ;

export const ADD_FRIEND = gql`
  mutation addFriend ($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friendCount
      friends {
        _id
        username
      }
    }
  }
`;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!) {
    addThought(thoughtText: $thoughtText) {
      _id
      thoughtText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($thoughtId: ID!, $reactionBody: String!) {
    addReaction(thoughtId: $thoughtId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_POKEMON = gql`
mutation addPokemon($pokemonName: String!, $level: Int!, $species: String!, $pokeDexId: Int) {
  addPokemon(pokemonName: $pokemonName, level: $level, species: $species, pokeDexId: $pokeDexId) {
    _id
    pokemonName
    username
    level
    species
    pokeDexId
  }
}`

export const REMOVE_POKEMON = gql`
mutation removePokemon ($pokemonId: ID!) {
  removePokemon(pokemonId:$pokemonId){
    username
    currentTeam{
      _id
      pokemonName
      species
    }
  }
}`