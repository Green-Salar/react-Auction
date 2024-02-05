import React, { useState } from 'react';
import { Card, Badge, Button,   Carousel} from 'react-bootstrap';
import { FaHeart, FaBell, FaShareAlt, FaEnvelope, FaChevronLeft, FaChevronRight , FaTag } from 'react-icons/fa';
import { format, formatDistanceToNow } from 'date-fns';


const AuctionCard = ({ item }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotified, setIsNotified] = useState(false);
  const formattedTime = format(new Date(item.auctionTime), 'PPpp'); // e.g., 'Feb 3, 2024, 2:00 PM'
  const timeUntilAuction = formatDistanceToNow(new Date(item.auctionTime), { addSuffix: true }); // e.g., 'in about 1 month'
  const toggleFavorite = () => setIsFavorite(!isFavorite);
  const toggleNotification = () => setIsNotified(!isNotified);
  const showIndicators = item.images.length > 1;

  return (
    <Card className="auction-card" style={{ width: '18rem', borderRadius: '15px', overflow: 'hidden' }}>
      <Carousel interval={null} indicators={showIndicators} nextIcon={showIndicators ? <FaChevronRight /> : null} prevIcon={showIndicators ? <FaChevronLeft /> : null}>
        {item.images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img className="d-block w-100" src={image} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <div className="card-top">
        <div className="title-and-icons">
            <Card.Title className="card-title">{item.title}</Card.Title>
            <div className="icons">
              <FaHeart onClick={toggleFavorite} color={isFavorite ? 'red' : 'grey'} />
              <FaBell onClick={toggleNotification} color={isNotified ? 'blue' : 'grey'} />
              <FaShareAlt />
              <FaEnvelope />
            </div>
            </div>
        <Card.Text>{item.description}</Card.Text>
        </div>
        
        <div><strong>Status:</strong> {item.status}</div>
        <div>
          <strong>Badges:</strong>
          {item.badges.map((badge, index) => (
            <Badge bg="secondary" key={index}>{badge}</Badge>
          ))}
        </div>
        <div><strong>Location:</strong> {item.location}</div>
        <div className="auction-time">
          <strong>Auction Time:</strong> {formattedTime} ({timeUntilAuction})
        </div>
        <div>
          <strong>Prices:</strong>
          <ul>
            <li>Start Bid: {item.prices.startBid}</li>
            <li>Last Bid: {item.prices.lastBid}</li>
            <li>Estimated Real World Price: {item.prices.estimated}</li>
            <li>
              <a href={item.prices.infoLink}>
                More Info <FaTag />
              </a>
            </li>
          </ul>
        </div>
        <div className="buttons">
          <Button variant="primary" size="sm">Bid</Button>
          <Button variant="secondary" size="sm">Exchange</Button>
          <Button variant="success" size="sm">Request</Button>
          <Button variant="info" size="sm">Interest</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default AuctionCard;
