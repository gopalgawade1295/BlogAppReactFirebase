import React, { useState } from 'react';
import GoogleButton from 'react-google-button';
import { auth, provider } from '../Firebase';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

function Loginpage({ setIsAuth }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  const SignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((response) => {
        localStorage.setItem('isAuth', true)
        setIsAuth(true)
        history.push('/')
      })
  }

  const Login = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('isAuth', true)
      setIsAuth(true)
      history.push('/')
    } catch (error) {
      setError(error.message)
    }
  }

  const Register = () => {
    history.push('/register')
  }

  return <div className="container">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <Form>
          <h3>Login</h3>
          <br />
          <div className="form-group">
            {
              error ? <div class="alert alert-danger" role="alert">{error}</div> : null
            }
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <Button variant="primary" onClick={Login}>Login</Button>
            <br />
            <br />
            <p>Not a member yet? <Button onClick={Register}>Register</Button></p>
            <p>or</p>
            <GoogleButton onClick={SignInWithGoogle} />
          </div>
        </Form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>;
}

export default Loginpage;
