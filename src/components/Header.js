import React from 'react';

const Header = ({ toggleTimer, timerEnabled }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Pair It Up</h1>
      <div className="space-x-4">
        <button className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400">
          Single Player
        </button>
        <button className="bg-green-500 px-4 py-2 rounded hover:bg-green-400">
          Multiplayer
        </button>
        <button
          className={`px-4 py-2 rounded ${
            timerEnabled ? 'bg-red-500' : 'bg-gray-500'
          }`}
          onClick={toggleTimer}
        >
          {timerEnabled ? 'Disable Timer' : 'Enable Timer'}
        </button>
      </div>
    </header>
  );
};

export default Header;
