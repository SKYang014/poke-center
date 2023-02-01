import React from 'react';
import { useQuery } from '@apollo/client'
import { QUERY_POKEMONS } from '../utils/queries'
import { Link } from 'react-router-dom';


const Landing = () => {
    const { loading, error, data } = useQuery(QUERY_POKEMONS);
    console.log(data)
    if (loading) {
        return <div>Loading...</div>
    }
    let randNum = Math.floor(Math.random() * 134)
    // let randNum2 = Math.floor(Math.random() * 134)
    return (
        <div className='flex flex-column justify-center'>
            {/* <h1>Make Posts! </h1> */}
            <h1 className='text-center m-5 card-header'>Welcome!</h1>
            <div className='flex flex-row justify-center'>
                {/* <img src={`${data.pokemons[randNum2].bigPhoto}`} className="" /> */}

                <img src={`${data.pokemons[randNum].bigPhoto}`} className="m-3" />
            </div>
            <div className='flex flex-row justify-center'>

                <div className='card m-2 w-25'>
                    <h3 className='card-header'>Share Posts!</h3>
                    <p className='m-3'>Share your thoughts and react to your friend's posts!</p>
                </div>
                <div className='card m-2 w-25'>
                    <h3 className='card-header'>Manage your Team!</h3>
                    <p className='m-3'>Create and adjust your team so everyone knows who's on your team!</p>
                </div>
                <div className='card m-2 w-25'>
                    <h3 className='card-header'>Add friends!</h3>
                    <p className='m-3'>Keep in touch with other trainers by adding them to your friends list! </p>
                </div>
            </div>
            <div className='button-holder flex flex-row justify-center'>
                <Link to="/login">
                    <div className='btn m-2'>Login</div>
                </Link>
                <Link to="/signup">

                    <div className='btn m-2'>Signup</div>
                </Link>
            </div>

        </div>
    )

}
export default Landing;