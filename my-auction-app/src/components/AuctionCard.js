import React from 'react';
import { Card } from 'react-bootstrap';

const AuctionCard = ({ item }) => {
  return (
    <Card style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden' }}>
      <Card.Img variant="top" src={item.image} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>{item.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AuctionCard;
