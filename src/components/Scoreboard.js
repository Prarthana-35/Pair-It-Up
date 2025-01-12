import React from 'react';

const Scoreboard = ({ score, totalCards }) => {
  const progress = (score / (totalCards * 10)) * 100;

  return (
    <div className="text-white p-4 flex justify-between items-center">
        <div
          className="bg-yellow-500 h-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
  );
};

export default Scoreboard;