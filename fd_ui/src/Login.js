import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const adminUser = {
    name: "admin",
    password: "admin",
  }
  const [user, setUser] = useState({
    name: "",
    password: ""
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setUser({ ...user, [e.target.name]: value });
    if (!!errors[user])
      setErrors({
        ...errors,
        [user]: null
      })
  };

  const doLogin = () => {
    try {
      if (user.name === adminUser.name && user.password === adminUser.password) {
        navigate('/Home');
      } else {
        setErrors("Invalid username or password")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='centered-div'>
    <Container className="d-grid h-100">
      <Form className="text-center w-25">
        <h1 className="mb-3 fs-3 fw-normal">Login</h1>
        <Form.Group className="mb-1"
          controlId="userName">
          <Form.Control type="text" placeholder="userName" name='name' value={user.name} required="true" autoComplete="userName" className="position-relative"
            isInvalid={!!errors.name}
            onChange={(e) => handleChange(e)} />
          <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1"
          controlId="password">
          <Form.Control type="text" placeholder="password" name='password' required="true" value={user.password} className="position-relative"
            isInvalid={!!errors.name}
            onChange={(e) => handleChange(e)} />
          <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
        </Form.Group>
        {/* <p className="mt-5">&copy; 2022-2023</p> */}
        <Button type='submit' onClick={doLogin}>Submit</Button>
      </Form>
    </Container>
    </div>
  )
}

export default Login