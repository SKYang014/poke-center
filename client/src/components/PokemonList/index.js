import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Auth from '../../utils/auth';
const PokemonList = ({ pokemon, title, removefunc }) => {
    const { username: userParam } = useParams();
    if (!pokemon.length) {
        return <div>
            <h3>No Pokemon Yet!</h3>
        </div>
    }
    console.log(pokemon)

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
                            {Auth.loggedIn() && !userParam ?
                                <button className="btn ml-auto" onClick={() => removefunc(poke._id)}>remove</button> :
                                ""}
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
