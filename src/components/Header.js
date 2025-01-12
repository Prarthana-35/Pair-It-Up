import React from 'react';

const Header = ({ toggleTimer, timerEnabled }) => {
  return (
    <>
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center mt-6 mb-6 ">
      <h1 className="text-2xl font-bold">Pair It Up</h1>  <br />
      </header>
      <p className="bg-gray-400 text-white-300 p-5 flex justify-center items-center text-xl">Welcome to the world of Permutations & Combinations !!</p>
      </>
  );
};

export default Header;
 