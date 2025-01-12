/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../App.css";

const GameBoard = ({ updateScore }) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [gridSize, setGridSize] = useState(4);
  const [timer, setTimer] = useState(0);
  const [currentMode, setCurrentMode] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [scores, setScores] = useState({ player1: 0, player2: 0 });
  const [playerTimes, setPlayerTimes] = useState({ player1: 0, player2: 0 });

  const generatePairs = (size) => {
    const totalCards = size * size;
    const numbers = [];
    for (let i = 1; i <= totalCards / 2; i++) {
      numbers.push(i, i);
    }
    return numbers.sort(() => Math.random() - 0.5);
  };

  const initializeCards = () => {
    const pairs = generatePairs(gridSize);
    const shuffledCards = pairs.map((pair, index) => ({
      id: index,
      number: pair,
      flipped: false,
    }));
    setCards(shuffledCards);
  };

  useEffect(() => {
    initializeCards();
  }, [gridSize]);

  useEffect(() => {
    let timerInterval;
    if (currentMode && !playerTimes[`player${currentPlayer}`]) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [currentMode, currentPlayer, playerTimes]);

  const handleCardFlip = (id) => {
    if (
      flippedCards.length < 2 &&
      !flippedCards.includes(id) &&
      !matchedCards.includes(id)
    ) {
      setFlippedCards((prev) => [...prev, id]);
    }
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      const isMatch = cards[first].number === cards[second].number;
      if (isMatch) {
        setMatchedCards((prev) => [...prev, first, second]);
        if (currentMode === "Single Player") {
          updateScore((prev) => prev + 10);
        } else {
          setScores((prevScores) => ({
            ...prevScores,
            [`player${currentPlayer}`]:
              prevScores[`player${currentPlayer}`] + 10,
          }));
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  }, [flippedCards, cards, updateScore, currentMode, currentPlayer]);

  const checkCompletion = () => {
    if (matchedCards.length === cards.length) {
      if (currentMode === "Single Player") {
        setCurrentMode(null);
        setPlayerTimes({ player1: timer });
      } else {
        if (currentPlayer === 1) {
          setPlayerTimes((prev) => ({ ...prev, player1: timer }));
          alert(`Player 1 completed! Time: ${timer}s`);
          setCurrentPlayer(2);
          setMatchedCards([]);
          setFlippedCards([]);
          setTimer(0);
          initializeCards(); //shuffling
        } else {
          setPlayerTimes((prev) => ({ ...prev, player2: timer }));
          alert(`Player 2 completed! Time: ${timer}s`);
          const winner =
            playerTimes.player1 < playerTimes.player2
              ? "Player 1 Wins!"
              : playerTimes.player1 > playerTimes.player2
              ? "Player 2 Wins!"
              : "It's a Tie!";
          alert(`Game Over! ${winner}`);
          setCurrentMode(null);
        }
      }
    }
  };

  useEffect(() => {
    if (currentMode) {
      checkCompletion();
    }
  }, [matchedCards]);

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
    setTimer(0);
    setScores({ player1: 0, player2: 0 });
    setMatchedCards([]);
    setFlippedCards([]);
    setCurrentPlayer(1);
    setPlayerTimes({ player1: 0, player2: 0 });
    initializeCards();
  };

  return (
    <div className="bg-gray-900 text-yellow-900 flex flex-col items-center justify-center h-screen">
      <div className="space-x-4 mt-4">
        <button
          className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-400"
          onClick={() => handleModeChange("Single Player")}
        >
          Single Player
        </button>
        <button
          className="bg-green-500 px-4 py-2 rounded hover:bg-green-400"
          onClick={() => handleModeChange("Multiplayer")}
        >
          Multiplayer
        </button>
      </div>

      {currentMode && (
        <div className="mt-4">
          <p className="text-lg font-bold">Mode: {currentMode}</p>
          {currentMode === "Multiplayer" && (
            <p className="text-lg">Player {currentPlayer}'s Turn</p>
          )}
          <p className="timer text-green-600 text-xl font-bold">Time: {timer}s</p>
          {currentMode === "Multiplayer" && (
            <p className="text-lg">
              Scores: Player 1: {scores.player1}, Player 2: {scores.player2}
            </p>
          )}
        </div>
      )}

      <div
        className="grid mt-4 gap-4"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {cards.map((card, index) => (
          <Card
            key={card.id}
            data={card}
            flipped={flippedCards.includes(index) || matchedCards.includes(index)}
            onClick={() => handleCardFlip(index)}
            customClass={`bg-gray-800 border-2 border-gray-600 ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? "text-yellow-400 text-shadow-md"
                : "text-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
