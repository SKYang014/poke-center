import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth'

const Login = (props) => {
  const [login, { error }] = useMutation(LOGIN_USER)
  const [formState, setFormState] = useState({ email: '', password: '' });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const testData = () => {
    setFormState({
      email: "test1@test.com",
      password: "test12345"
    })
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // if (entry === "tester") {
    //   setFormState({
    //     email: "test@test.com",
    //     password: "test12345"
    //   })
    //   try {
    //     const { data } = await login({
    //       variables: { ...formState }
    //     });
    //     console.log(data)
    //     Auth.login(data.login.token)
    //   }
    //   catch (e) {
    //     console.log(e)
    //   }
    //   // clear form values
    //   setFormState({
    //     email: '',
    //     password: '',
    //   });

    // }
    // else {
    try {
      const { data } = await login({
        variables: { ...formState }
      });
      console.log(data)
      Auth.login(data.login.token)
    }
    catch (e) {
      console.log(e)
    }
    // clear form values
    setFormState({
      email: '',
      password: '',
    });
    // }
  };

  return (
    <main className='flex-row justify-center mb-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form onSubmit={handleFormSubmit}>
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
              <button className='btn d-block w-100' type="submit" >
                Submit
              </button>
              <button className='btn d-block w-100' onClick={testData}>
                Tester Login
              </button>
            </form>
            {error && <div >Login Failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
