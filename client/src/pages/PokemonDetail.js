import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client'
import { QUERY_POKEMON, QUERY_POKEMONS } from '../utils/queries'
import { Link } from 'react-router-dom';

const PokemonDetail = () => {
    const { id: pokeDexId } = useParams();
    const pokeInt = parseInt(pokeDexId)
    // console.log(typeof (pokeInt))
    const { loading, error, data } = useQuery(QUERY_POKEMON, {
        variables: { pokeDexId: pokeInt }
    });

    const { loading: load, error: err, data: pokeData } = useQuery(QUERY_POKEMONS, {
        variables: { pokeDexId: pokeInt }
    });
    // console.log(pokeData)

    // console.log(data)
    const pokemon = data?.pokemonDetail || [];
    // console.log(pokemon)
    if (loading || load) {
        return <div>Loading...</div>
    }
    if (error || err) {
        return `error ${error.message}`
    }

    // console.log(pokeData.pokemons.length)
    return (
        <div>
            {pokeData.pokemons.length > 0 ?
                <div>
                    <h2>{pokeData.pokemons[0].species}</h2>
                    <div>
                        <img src={`${pokeData.pokemons[0].bigPhoto}`} alt={`a ${pokeData.pokemons.species}`} />
                        <p>
                            {pokeData.pokemons[0].description}
                        </p>
                    </div>
                </div>
                :
                <div> Only Hoen Region Pokemon, Sorry! </div>}


            {pokemon.length ?
                <div>
                    Trainers with {pokemon[0].species}s near you:
                    {pokemon.map(poke => (
                        <Link to={`/profile/${poke.username}`}>
                            <div key={poke._id} className="card mb-3">
                                <p>{poke.pokemonName} the {poke.shiny ? (<span className="text-warning">shiny</span>) : ''} {poke.species}</p>
                                <img src={`${poke.photo}`} alt={`a ${poke.species}`} />
                                <p>Trainer {poke.username}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                :
                <div> No nearby trainers with this pokemon!</div>}

        </div>
    );
}

export default PokemonDetail;