import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PokeDex from '../components/PokeDex';
import { useMutation, useQuery } from '@apollo/client'
import { QUERY_ME, QUERY_POKEMONS } from '../utils/queries'
import { ADD_POKEMON } from '../utils/mutations'
import Auth from '../utils/auth';

const AddPokemon = () => {
    // const { id: userParam } = useParams();
    const { username: userParam } = useParams();
    const { loading, data } = useQuery(QUERY_ME, {
        variables: { username: userParam }
    });
    //query all poko database for selection
    const { loading: load, error: err, data: pokeData } = useQuery(QUERY_POKEMONS);
    const [addPokemon] = useMutation(ADD_POKEMON)
    //initialize form data
    const [formState, setFormState] = useState(
        {
            username: userParam,
            pokemonName: '',
            level: '',
            species: '',
            pokeDexId: 0,
            photo: '',
            bigPhoto: '',
            shiny: false,
            description: ''
        }
    );

    //check if logged in
    if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to="/addpokemon" />
    }
    const user = data?.user || {}
    // console.log(user._id)
    // console.log(pokeData)
    if (loading) {
        return <div>Loading...</div>
    }

    // update state based on form input changes
    const handleChange = (event) => {
        const { name, value, type } = event.target;

        setFormState(prevState => {
            return {
                ...prevState,
                [name]: type === 'number' ? parseInt(value) : value,

            }
        });
        console.log(formState)

    };
    //check if shiny checked
    const shinyToggle = (event) => {
        setFormState(formState => {
            return {
                ...formState,
                shiny: !formState.shiny
            }
        })
    }


    // submit form (notice the async!)
    const handleFormSubmit = async event => {
        event.preventDefault();

        // use try/catch instead of promises to handle errors
        try {
            // execute addUser mutation and pass in variable data from form
            await addPokemon({
                variables: { ...formState }
            });
            alert("pokemon added")
            console.log(formState)
        } catch (e) {
            console.error(e);
        }
    };

    //handles user choosing a pokemon
    function handlePokeChoose(pokeDexId, photo, description, bigPhoto, species) {
        // refetch({ pokeDexId: pokeDexId })

        // const pokePhoto = formState.shiny ? pokeData.shinyPhoto : pokeData.photo
        setFormState(prevState => {
            return {
                ...prevState,
                species: species,
                pokeDexId: pokeDexId,
                photo: photo,
                bigPhoto: bigPhoto,
                description: description
            }
        })
        console.log(formState)
    }



    if (loading || load) {
        return <div>Loading...</div>
    }
    return (
        <main className='flex-row justify-center mb-4'>
            <div className='col-12 col-md-12'>
                {/* <PokemonList pokemon={user.currentTeam}
                    title="Your Current Team" /> */}
                <div className='card'>
                    <h4 className='card-header'>Add A Pokemon to Your Team!</h4>
                    <div className='card-body'>
                        <form onSubmit={handleFormSubmit}>
                            Your Pokemon's Name:
                            <input
                                className='form-input'
                                placeholder='Nickname'
                                name='pokemonName'
                                type='string'
                                id='pokemonName'
                                value={formState.pokemonName}
                                onChange={handleChange}
                            />
                            Current Level:
                            <input
                                className='form-input'
                                placeholder='level'
                                name='level'
                                type='number'
                                id='level'
                                value={formState.level}
                                onChange={handleChange}
                            />
                            Shiny:
                            <input
                                className='form-input'
                                placeholder='shiny'
                                name='shiny'
                                type='checkbox'
                                id='shiny'
                                value={!formState.shiny}
                                onChange={shinyToggle}
                            />
                            <button className='btn d-block w-100' type='submit'>
                                Submit
                            </button>
                            <PokeDex shinyCheck={formState.shiny}
                                pokeInfo={pokeData}
                                parentCallBack={handlePokeChoose}
                                selected={formState.pokeDexId} />
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AddPokemon;
