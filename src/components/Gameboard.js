import React, { useState, useEffect } from 'react';
import Card from './Card';

const GameBoard = ({ updateScore }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gridSize, setGridSize] = useState(4);  // Default grid size (4x4)

  // Function to generate number pairs for the grid
  const generatePairs = (size) => {
    const totalCards = size * size;
    const numbers = [];

    // Generate a list of numbers (each number will appear twice)
    for (let i = 1; i <= totalCards / 2; i++) {
      numbers.push(i, i);  // Add the same number twice for pairs
    }

    // Shuffle the numbers randomly
    return numbers.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    const initializeGame = () => {
      const pairs = generatePairs(gridSize); // Generate pairs based on grid size
      const shuffledCards = pairs.map((pair, index) => ({
        id: index,
        number: pair,
        flipped: false
      }));
      setCards(shuffledCards);
    };

    initializeGame();
  }, [gridSize]);

  const handleCardFlip = (id) => {
    if (flippedCards.length < 2) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const isMatch = cards[first].number === cards[second].number;
      if (isMatch) {
        setMatchedCards((prev) => [...prev, first, second]);
        updateScore((prev) => prev + 10);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards, updateScore]);

  const handleGridSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setGridSize(newSize);
  };

  return (
    <div>
      <div className="p-4">
        <label htmlFor="grid-size">Grid Size (n x n): </label>
        <input
          type="number"
          id="grid-size"
          value={gridSize}
          onChange={handleGridSizeChange}
          min="2"
          max="10"
        />
      </div>
      <div className="grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            flipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardFlip(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
