// src/components/Login.js

import React, { useState } from 'react';
import { auth } from '../firebase';
import { Container, Form, Button } from 'react-bootstrap';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signIn = async (e) => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            // Handle the successful login here (e.g., redirect to a protected page)
        } catch (error) {
            setError(error.message);
        }
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
        </Container>
    );
};

export default Login;
