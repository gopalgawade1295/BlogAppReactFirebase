import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase';
import { useHistory } from 'react-router-dom';

function Registerpage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  let history = useHistory()

  const Register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password)
      history.push('/login')
    }
    catch (error) {
      setError(error.message)
    }
  }

  const Back = () => {
    history.push('/login')
  }

  return <div className="container">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm">
        <Form>
          <h3>Register</h3>
          <br />
          <div className="form-group">
            {
              error ? <div class="alert alert-danger" role="alert">{error}</div> : null
            }
            <input type="email" className="form-control" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <input type="password" className="form-control" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <Button variant="primary" onClick={Register}>Register</Button>
            <br />
            <br />
            <p>Are you a member? <Button onClick={Back}>Click here to login</Button></p>
          </div>
        </Form>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>;
}

export default Registerpage;
