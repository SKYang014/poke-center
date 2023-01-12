import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import { useQuery } from '@apollo/client'
import { QUERY_USER, QUERY_POKEMONS } from '../utils/queries'

const AddPokemon = () => {
    // const { id: userParam } = useParams();
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_USER, {
        variables: { username: userParam }
    });
    const { loading: load, error: err, data: pokeData } = useQuery(QUERY_POKEMONS);

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

    const user = data?.user || {}
    console.log(user)
    console.log(pokeData)
    if (loading) {
        return <div>Loading...</div>
    }


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
                {/* <PokemonList pokemon={user.currentTeam}
                    title="Your Current Team" /> */}
                <div className='card'>
                    <h4 className='card-header'>Add A Pokemon to Your Team!</h4>
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

export default AddPokemon;
