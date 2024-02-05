import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Image, Container } from 'react-bootstrap';

const PostItemForm = () => {
  const navigate = useNavigate();
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];
  const [item, setItem] = useState({
    title: '',    currency: 'USD', // Default currency
    prices: {
      startBid: '',
      lastBid: '',
      estimated: '',
      infoLink: ''
    },
    description: '',
    images: [],
    status: 'Ongoing', // Default status
    badges: [],
    location: '',
    auctionTime: '',
    
    currency: 'USD', 
    prices: {
      startBid: '',
      lastBid: '',
      estimated: '',
      infoLink: ''
    }
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in item.prices) {
      setItem({ ...item, prices: { ...item.prices, [name]: value } });
    } else {
      setItem({ ...item, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesPreviewUrls = files.map(file => URL.createObjectURL(file));
    setItem({ ...item, images: imagesPreviewUrls });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(item);
    // TODO: Validate and process form data
    // TODO: Send data to the server or API
    navigate('/'); // Redirect to the home page after posting
  };

  return (
    <Container className="mt-5">
      <Form onSubmit={handleSubmit}>
        {/* Title */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Title:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="title"
              value={item.title}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Description */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Description:</Form.Label>
          <Col sm="10">
            <Form.Control
              as="textarea"
              name="description"
              value={item.description}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Images with Preview */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Images:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="file"
              name="images"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
            <Container className="mt-3">
              <Row>
                {item.images.map((imageSrc, index) => (
                  <Col key={index} xs={6} md={4}>
                    <Image src={imageSrc} thumbnail />
                  </Col>
                ))}
              </Row>
            </Container>
          </Col>
        </Form.Group>

        {/* Location */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Location:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="location"
              value={item.location}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Auction Time */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Auction Time:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="datetime-local"
              name="auctionTime"
              value={item.auctionTime}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Prices */}
        
        {/* Currency Selection */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Currency:</Form.Label>
          <Col sm="10">
            <Form.Select
              name="currency"
              value={item.currency}
              onChange={handleInputChange}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        {/* Start Bid */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Start Bid:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="startBid"
              value={item.prices.startBid}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        {/* Last Bid */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Last Bid:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="lastBid"
              value={item.prices.lastBid}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        {/* Estimated Price */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Estimated Price:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="estimated"
              value={item.prices.estimated}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>
        {/* Info Link */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Info Link:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="infoLink"
              value={item.prices.infoLink}
              onChange={handleInputChange}
              required
            />
          </Col>
        </Form.Group>

        {/* Badges */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Currency:</Form.Label>
          <Col sm="10">
            <Form.Select
              name="currency"
              value={item.currency}
              onChange={handleInputChange}
              required
            >
              {currencies.map(currency => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        {/* Status Toggle */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Status:</Form.Label>
          <Col sm="10">
            <Form.Check 
              type="switch"
              id="status-switch"
              label={item.status}
              checked={item.status === 'Ongoing'}
              onChange={() => {
                setItem({ ...item, status: item.status === 'Ongoing' ? 'Closed' : 'Ongoing' });
              }}
            />
          </Col>
        </Form.Group>

        <Button variant="primary" type="submit">Post Item</Button>
      </Form>
    </Container>
  );
};

export default PostItemForm;
