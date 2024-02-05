import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionCard from './components/AuctionCard';
import PostItemForm from './components/PostItemForm';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Navbar, Nav , NavLink} from 'react-bootstrap';

const App = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('/auction_data.json');
      setItems(result.data);
    }

    fetchData();
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
                            {/* Add more Nav.Link items as needed */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

      <Container>
        <Routes>
          <Route path="/post-item" element={<PostItemForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <Row>
              {items.map(item => (
                <Col xs={12} sm={6} md={4} lg={3} key={item.id} className="mb-3">
                  <AuctionCard item={item} />
                </Col>
              ))}
            </Row>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
