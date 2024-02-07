
import { useNavigate } from 'react-router-dom';
import { Form, Button, Col, Row, Image, Container } from 'react-bootstrap';
import { auth } from '../firebase';
import React, { useState, useEffect } from 'react';
import { postItem } from './firebaseServices'; 
const PostItemForm = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        // User is not signed in or session ended.
        navigate('/login'); // redirect to login page
      }
    });

    return unsubscribe; // unsubscribe on unmount
  }, [navigate]);
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
    category: '',

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
    const files = e.target.files;
    const uploadedImages = [];
  
    // Loop through each selected file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
  
      // Read the file as a data URL for preview
      reader.readAsDataURL(file);
  
      // Store the file object for upload
      uploadedImages.push(file);
    }
  
    // Update the state with the preview URLs and file objects
    setItem({ ...item, images: [...item.images, ...uploadedImages] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      console.error('No user logged in!');
      return;
    }
  
    try {
      // Call postItem instead of directly interacting with Firestore here
      await postItem(item, user.uid);
      console.log('Item posted successfully');
      navigate('/'); // Redirect to the home page after posting
    } catch (error) {
      console.error('Error posting item:', error);
    }
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

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Category:</Form.Label>
          <Col sm="10">
            <Form.Control
              as="select"
              name="category"
              value={item.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a Category</option>
              {<option key={"car cat1"} value={"carcat2"}>
                  {"Car3"}
                </option>}
            </Form.Control>
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
        
        {/* Starting Bid */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Starting Bid:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              name="startingBid"
              value={item.startingBid}
              onChange={handleInputChange}
              placeholder="Enter starting bid"
              
            />
          </Col>
        </Form.Group>

        {/* Bid Increment */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Bid Increment:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="number"
              name="bidIncrement"
              value={item.bidIncrement}
              onChange={handleInputChange}
              placeholder="Enter bid increment"
              
            />
          </Col>
        </Form.Group>

        {/* Auction Start Time */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Auction Start:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="datetime-local"
              name="auctionStart"
              value={item.auctionStart}
              onChange={handleInputChange}
              
            />
          </Col>
        </Form.Group>

        {/* Auction End Time */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Auction End:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="datetime-local"
              name="auctionEnd"
              value={item.auctionEnd}
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
               
            />
          </Col>
        </Form.Group>

        {/* Badges */}
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">Badges:</Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="badges"
              value={item.badges}
              onChange={handleInputChange}
              placeholder="Enter badges separated by commas"
             
            />
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
