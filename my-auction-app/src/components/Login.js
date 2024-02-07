// src/components/Login.js

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginUser } from './firebaseServices';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const signIn = async (e) => {
      e.preventDefault();
      try {
        await loginUser(email, password); // Call the loginUser function
        navigate('/'); // Redirect to home page after successful login
      } catch (error) {
        setError(error.message);
      }
    };

    const goToRegister = () => {
      navigate('/register'); // Navigate to the registration page
    };

    return (
        <Container>
            <h2>Login</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Form onSubmit={signIn}>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button type="submit">Log In</Button>
            </Form>
            <p>Dont have an account? <Button variant="link" onClick={goToRegister}>Register</Button></p>
        </Container>
    );
};

export default Login;
