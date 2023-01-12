import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PokemonList from '../components/PokemonList';

const AddPokemon = () => {
    const { id: userParam } = useParams();
    const [formState, setFormState] = useState(
        {
            username: userParam,
            pokemonName: '',
            level: '',
            species: '',
            pokeDexId: '',
            photo: '',
            bigPhoto: '',
            shiny: '',
            description: ''
        }
    );
    const { loading: load, error: err, data: pokeData } = useQuery(QUERY_POKEMONS, {
        variables: { pokeDexId: pokeInt }
    });

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    // submit form
    const handleFormSubmit = async (event) => {
        event.preventDefault();
    };

    return (
        <main className='flex-row justify-center mb-4'>
            <div className='col-12 col-md-6'>
                <div className='card'>
                    <h4 className='card-header'>Sign Up</h4>
                    <div className='card-body'>
                        <form onSubmit={handleFormSubmit}>
                            <input
                                className='form-input'
                                placeholder='Your username'
                                name='username'
                                type='username'
                                id='username'
                                value={formState.username}
                                onChange={handleChange}
                            />
                            <input
                                className='form-input'
                                placeholder='Your email'
                                name='email'
                                type='email'
                                id='email'
                                value={formState.email}
                                onChange={handleChange}
                            />
                            <input
                                className='form-input'
                                placeholder='******'
                                name='password'
                                type='password'
                                id='password'
                                value={formState.password}
                                onChange={handleChange}
                            />
                            <button className='btn d-block w-100' type='submit'>
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;
