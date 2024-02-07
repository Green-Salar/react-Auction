// src/components/Register.js

import React, { useState, useEffect } from 'react';
import { registerUser } from './firebaseServices'; // Adjust this import path as necessary
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { firestore } from '../firebase'; // Adjust this import path as necessary
import { collection, query, where, getDocs } from 'firebase/firestore';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [error, setError] = useState('');
  const [isNicknameUnique, setIsNicknameUnique] = useState(true); // Assuming true until checked
  const navigate = useNavigate();

  useEffect(() => {
    if (nickname) {
      checkNicknameUniqueness(nickname);
    }
  }, [nickname]);

  const checkNicknameUniqueness = async (nickname) => {
    const nicknamesRef = collection(firestore, 'users'); // Assuming 'users' is your collection
    const q = query(nicknamesRef, where('nickname', '==', nickname));
    const querySnapshot = await getDocs(q);
    setIsNicknameUnique(querySnapshot.empty); // Set based on if any documents are found
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isNicknameUnique) {
      setError('Nickname is already taken. Please choose another one.');
      return;
    }

    try {
      await registerUser(email, password, nickname); // Call the registerUser function
      // Redirect or handle the successful registration as needed
      navigate('/some-path-after-success'); // Adjust this path as necessary
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleRegister}>
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

                <Form.Group>
                <Form.Label>Nickname</Form.Label>
                <Form.Control
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    required
                />
        </Form.Group>
        
        <Button type="submit">Register</Button>
      </Form>
      <p>Already have an account? <Button variant="link" onClick={() => navigate('/login')}>Log In</Button></p>
    </Container>
  );
};

export default Register;
