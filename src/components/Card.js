import React from 'react';

const Card = ({ data, flipped, onClick }) => {
  if (!data || data.number === undefined) {
    return null;  
  }

  return (
    <div
      className={`w-20 h-20 bg-gray-200 rounded shadow transition-all duration-300 ${
        flipped ? 'bg-blue-400' : '' 
      }`}
      onClick={onClick}
    >
      {flipped && (
        <p className="text-white text-center text-lg font-bold">
          {data.number}
        </p>
      )}
    </div>
  );
};

export default Card;
