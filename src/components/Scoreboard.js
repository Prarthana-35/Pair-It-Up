import React from 'react';

const Scoreboard = ({ score, totalCards }) => {
  const progress = (score / (totalCards * 10)) * 100;

  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h2>Score: {score}</h2>
      <div className="w-full bg-gray-600 h-2 rounded overflow-hidden ml-4">
        <div
          className="bg-yellow-500 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Scoreboard;