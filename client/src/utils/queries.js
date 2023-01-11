import { gql } from '@apollo/client'

export const QUERY_THOUGHTS = gql`
    query thoughts($username: String) {
        thoughts(username: $username) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_THOUGHT = gql`
    query thought($id:ID!) {
        thought(_id: $id) {
            _id
            thoughtText
            createdAt
            username
            reactionCount
            reactions {
                _id
                createdAt
                username
                reactionBody
            }
        }
    }
`;

export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username){
            _id
            username
            email
            friendCount
            gymBadges
            pokeDexCompletion
            adventureStart
            currentTeam {
                _id
                pokemonName
                species
                level
                photo
                shiny
                description
                pokeDexId
            }
            thoughts {
                _id
                thoughtText
                createdAt
                reactionCount
            }
            friends {
                _id
                username
            }

        }
    }`

export const QUERY_POKEMON = gql`
query pokemonDetail ($pokeDexId: Int) {
  pokemonDetail(pokeDexId: $pokeDexId) {
            _id
            pokemonName
            species
            level
            photo
            bigPhoto
            shiny
            description
            pokeDexId
            username
  }
}`