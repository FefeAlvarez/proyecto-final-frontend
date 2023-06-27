import React, { useState } from 'react';

import axios from 'axios';
import { urlApiLogin } from '../../services/urls';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState({
    error: false,
    errorCode: '',
    errorMsg: ''
  });

  const submitChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log('submit');
  };

  const login = async () => {
    try {
      const response = await axios.post(urlApiLogin, form);
      console.log(response);
      if (response.status === 200) {
        window.location.href = '/home';
      }
    } catch (error) {
      setError({
        error: true,
        errorCode: error.response.status,
        errorMessage: error.response.data
      });
    }
  };

  return (
    <React.Fragment>
      <div className='wrapper fadeInDown'>
        <div id='formContent'>
          <h1>Bienvend@ a la app</h1>
          <form onSubmit={submitHandler}>
            <input
              type='text'
              className='fadeIn second'
              name='email'
              placeholder='mail@mail.com'
              onChange={submitChange}
            />
            <input
              type='password'
              className='fadeIn third'
              name='password'
              placeholder='password'
              onChange={submitChange}
            />
            <input
              type='submit'
              className='fadeIn fourth'
              value='Login'
              onClick={login}
            />
          </form>
          <div className='error'>
            {error.error && (
              <div>
                <p> El email y la contraseña no coinciden </p>
                <p>{`${error.errorCode}`}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Login };