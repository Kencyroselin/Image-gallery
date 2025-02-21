import React, { useState, useEffect } from 'react';
import './index.css';

const ImageGallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [images, setImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);

  const fetchImages = async () => {
    const apiKey = 'cXnEiIYOWdjb4n3vDomgNLZcK2VgoEDqlKP3RpRnx40';
    const url = searchQuery
      ? `https://api.unsplash.com/search/photos/?query=${searchQuery}&client_id=${apiKey}`
      : `https://api.unsplash.com/photos/?client_id=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    setImages(data);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const saveImage = (image) => {
    setSavedImages((prevSaved) => [...prevSaved, image]);
  };

  const handleSaveClick = (image) => {
    saveImage(image);
  };

  return (
    <div className="gallery-container p-4">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>ImageGallery</h1>
        </div>
        <div className="navbar-links">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#saved">Saved Images</a></li>
          </ul>
        </div>
        <div className="navbar-toggle" id="navbar-toggle">
          <span>&#9776;</span>
        </div>
      </nav>

      <h1 className="heading">Random Image Gallery</h1>

     
      {/* <input
        type="text"
        className="search-input"
        placeholder="Search for images..."
        value={searchQuery}
        onChange={handleSearchChange}
      /> */}

      <button
        className="fetch-button"
        onClick={fetchImages}
      >
        Fetch New Images
      </button>
      <div className="image-grid">
        {images.length === 0 ? (
          <p>No images found. Try searching for something else!</p>
        ) : (
          images.map((image) => (
            <div key={image.id} className="image-card">
              <img src={image.urls.small} alt={image.alt_description} className="image" />
              <button
                className="save-button"
                onClick={() => handleSaveClick(image)}
              >
                <span className="save-text">Save</span>
              </button>
            </div>
          ))
        )}
      </div>

      <h2 className="saved-heading">Saved Images</h2>
      <div className="saved-images">
        {savedImages.map((image, index) => (
          <img key={index} src={image.urls.small} alt={image.alt_description} className="saved-image" />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
