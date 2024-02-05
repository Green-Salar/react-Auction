import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AuctionCard from './components/AuctionCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';

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
          <Col md={12} key={item.id} className="mb-3"> {/* Changed from md={4} to md={12} */}
            <AuctionCard item={item} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default App;
