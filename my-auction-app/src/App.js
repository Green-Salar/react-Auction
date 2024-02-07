import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Container, Navbar, Nav,  } from 'react-bootstrap';

import PostItemForm from './components/PostItemForm';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Home from './components/Home'; // Import the Home component
import 'bootstrap/dist/css/bootstrap.min.css';
import { firestore } from './firebase'; // Import firestore from firebase
import { collection, getDocs } from 'firebase/firestore'; // Import collection and getDocs

const App = () => {
  // State to hold the items
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Fetch items from Firestore
        const itemsCollection = collection(firestore, 'items');
        const snapshot = await getDocs(itemsCollection);
        const itemsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">AuctionSite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/post-item">Post an Item</Nav.Link>
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
              <Nav.Link as={Link} to="/register">Register</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Routes>
          <Route path="/" element={<Home items={items} />} />
          <Route path="/post-item" element={<PostItemForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Container>

    </Router>
  );
};

export default App;
