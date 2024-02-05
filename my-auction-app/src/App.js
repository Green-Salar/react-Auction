import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionCard from './components/AuctionCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import PostItemForm from './components/PostItemForm';
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
    <Container>
      <Row>
        {items.map(item => (
          // xs=12 ensures full width on extra small (mobile) screens
          // sm=6 for 2 cards per row on small screens,
          // md=4 for 3 cards per row on medium screens,
          // lg=3 for 4 cards per row on large screens
          <Col xs={12} sm={6} md={4} lg={3} key={item.id} className="mb-3">
            <AuctionCard item={item} />
          </Col>
        ))}


        <PostItemForm />
      </Row>
      
    </Container>
  );
}

export default App;
