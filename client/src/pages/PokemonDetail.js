import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_POKEMON } from '../utils/queries'
import UserList from '../components/UserList';

const PokemonDetail = () => {
    const { id: pokeDexId } = useParams();
    const pokeInt = parseInt(pokeDexId)
    // console.log(typeof (pokeInt))
    const { loading, error, data } = useQuery(QUERY_POKEMON, {
        variables: { pokeDexId: pokeInt }
    });
    console.log(data)
    const pokemon = data?.pokemonDetail || [];
    console.log(pokemon)
    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return `error ${error.message}`
    }
    return (
        <div>
            <h2>{pokemon[0].species}</h2>
            <div>
                <img src={`${pokemon[0].bigPhoto}`} />
                <p>
                    {pokemon[0].description}
                </p>
            </div>
            {/* <div className="card mb-3">
                <p className="card-header">
                    <span style={{ fontWeight: 700 }} className="text-light">
                        {pokemon.species}
                    </span>{' '}
                    PokeDex No. #{pokemon.pokeDexId}
                </p>
                <div className="card-body">
                    <p>{pokemon.description}</p>
                </div>
            </div>
            {pokemon.username > 0 && <UserList user={pokemon.user} />} */}
            Trainers with {pokemon[0].species}s near you:
            {pokemon.map(poke => (
                <div key={poke._id} className="card mb-3">
                    <img src={`${poke.photo}`} />
                    <p>Trainer {poke.username}</p>
                    {poke.pokemonName}
                </div>
            ))}
        </div>
    );
}

export default PokemonDetail;