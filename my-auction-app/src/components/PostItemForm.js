import React, { useState } from 'react';

const PostItemForm = () => {
  const [item, setItem] = useState({ title: '', description: '', images: [] });

  const handleInputChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    // Create a FileList object
    const files = Array.from(e.target.files);

    // Update the state
    setItem({ ...item, images: files });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form data. For example, you can send it to a backend server here.
    console.log(item);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={item.title}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={item.description}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Images:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <button type="submit">Post Item</button>
    </form>
  );
};

export default PostItemForm;
