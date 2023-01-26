import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth'

const Signup = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '', gymBadges: 0, pokeDexCompletion: 0 });
  const [addUser, { error }] = useMutation(ADD_USER)
  const [login, { error: err }] = useMutation(LOGIN_USER)

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value, type } = event.target;


    setFormState({
      ...formState,
      [name]: type === 'number' ? parseInt(value) : value
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async event => {
    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState }
      });
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const testLogin = async event => {
    window.location.assign('/login')
  }


  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Sign Up</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
              Username:
              <input
                className='form-input'
                placeholder='Greatest.Trainer555'
                name='username'
                type='username'
                id='username'
                value={formState.username}
                onChange={handleChange}
              />
              Email:
              <input
                className='form-input'
                placeholder='pokemonRock@poken.com'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              Password:
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              Current Gym Badges out of 8:
              <input
                className='form-input'
                placeholder='0/8'
                name='gymBadges'
                type='number'
                id='gymbadges'
                value={formState.gymBadges}
                onChange={handleChange}
              />
              Current PokeDex Completion out of 202:
              <input
                className='form-input'
                placeholder='0/202'
                name='pokeDexCompletion'
                type='number'
                id='pokeDexCompletion'
                value={formState.pokeDexCompletion}
                onChange={handleChange}
              />
              <button className='btn d-block w-100' type='submit'>
                Submit
              </button>
              <button className='btn d-block w-100' type='submit' onClick={testLogin}>Tester Login</button>
            </form>
            {error && <div>Sign up failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
