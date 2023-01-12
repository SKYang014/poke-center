import React from 'react';
import { Link } from 'react-router-dom';

const PokemonList = ({ pokemon, title }) => {
    if (!pokemon.length) {
        return <h3>No Pokemon Yet!</h3>;
    }
    // console.log(pokemon)

    return (
        <div>
            <h3>{title}</h3>
            {pokemon &&
                pokemon.map(poke => (
                    <div key={poke._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                                to={`/pokemon/${poke.pokeDexId}`}
                                style={{ fontWeight: 700 }}
                                className="text-light"
                            >
                                {poke.pokemonName} the {poke.shiny ? (<span className="text-warning">shiny</span>) : ''} {poke.species}
                            </Link>{' '}

                        </p>
                        <div className="card-body">
                            <Link to={`/pokemon/${poke.pokeDexId}`}>
                                <img src={`${poke.photo}`} alt={`a ${poke.species}`} />
                                <p>Level: {poke.level}</p>
                                <p>Description: {poke.description}</p>
                                <p>PokeDex No. {poke.pokeDexId}</p>
                                <p className="mb-0">

                                </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default PokemonList;
