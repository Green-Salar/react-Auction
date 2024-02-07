import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Form, Button } from 'react-bootstrap';
import { getUserProfile, updateUserProfile } from '../userProfileFirebase';



const UserProfile = ({ userId }) => {
    console.log("USIR ID IS @@"+userId);
  const [profileData, setProfileData] = useState({});
  const [newProfileData, setNewProfileData] = useState({});

  useEffect(() => {
    const fetchProfileData = async () => {
      const data = await getUserProfile(userId);
      setProfileData(data);
    };
    fetchProfileData();
  }, [userId]);

  const handleInputChange = (e) => {
    setNewProfileData({ ...newProfileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(userId, newProfileData);
      setProfileData({ ...profileData, ...newProfileData });
      setNewProfileData({});
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" value={profileData.email || ''} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nickname</Form.Label>
          <Form.Control type="text" name="nickname" value={newProfileData.nickname || profileData.nickname || ''} onChange={handleInputChange} />
        </Form.Group>
        {/* Add more fields for other profile data */}
        <Button variant="primary" type="submit">Save Changes</Button>
      </Form>
    </div>
  );
};

UserProfile.propTypes = {
  userId: PropTypes.string.isRequired, // Define the prop type for userId
};

export default UserProfile;
