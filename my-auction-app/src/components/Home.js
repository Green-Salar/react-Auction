// Home.js
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AuctionCard from './AuctionCard'; // Import the AuctionCard component
import PropTypes from 'prop-types'; // Import PropTypes


const Home = ({ items }) => {
  return (
    <div>
      <h2>Latest Auctions</h2>
      <div className="auction-list">
        <Row>
            {items?.map((item) => (
                <Col xs={12} sm={6} md={4} lg={3} key={item.id} className="mb-3">
                    <AuctionCard item={item} />
                </Col>
            ))}
        </Row>

      </div>
    </div>
  );
};
// Inside Home component file
Home.propTypes = {
    items: PropTypes.array
  };
  
  // Default props for Home
  Home.defaultProps = {
    items: [] // Ensures `items` is an array, even if empty
  };
export default Home;
