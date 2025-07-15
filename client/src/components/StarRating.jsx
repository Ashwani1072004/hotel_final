import React from 'react';
import { assets } from '../assets/assets'; // Ensure the path is correct

const StarRating = ({ rating = 4 }) => {
  return (
    <>
      {Array(5)
        .fill('')
        .map((_, index) => (
          <img
            key={index}
            src={rating > index ? assets.starIconFilled : assets.starIconOutlined} 
            alt="star-icon"
            className="w-5 h-5" 
          />
        ))}
    </>
  );
};

export default StarRating;
