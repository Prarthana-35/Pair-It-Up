import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Gameboard from './components/Gameboard';
import Scoreboard from './components/Scoreboard';

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isMultiplayer, setIsMultiplayer] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(1); 
  const [playerScores, setPlayerScores] = useState([0, 0]); 
  const [round, setRound] = useState(1); 
  const [gridSize, setGridSize] = useState(4); 

  useEffect(() => {
    generateCards(); 
  }, [gridSize]);

  const generateCards = () => {
    const totalCards = gridSize * gridSize;
    const numbers = [];
  
    for (let i = 1; i <= totalCards / 2; i++) {
      numbers.push(i, i); 
    }
  
    const shuffled = numbers.sort(() => Math.random() - 0.5);
  
    const shuffledCards = shuffled.map((value, index) => ({ id: index, value }));
    setCards(shuffledCards);
  };
  

  const handleFlip = (index) => {
    if (flippedCards.length === 2 || matchedPairs.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [firstIndex, secondIndex] = newFlipped;
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        setScore((prevScore) => prevScore + 10);
      } else {
        setTimeout(() => setFlippedCards([]), 1000); // Flip back cards after 1 second
      }
    }

    if (matchedPairs.length === cards.length - 2) {
      setIsGameOver(true);
    }
  };

  const nextRound = () => {
    setRound((prevRound) => prevRound + 1);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setFlippedCards([]);
    setMatchedPairs([]);
    setTimer(60); 
  };

  const handleGridSizeChange = (size) => {
    setGridSize(size);
    resetGame();
  };

  const resetGame = () => {
    setScore(0);
    setFlippedCards([]);
    setMatchedPairs([]);
    setTimer(60);
    setIsGameOver(false);
    setPlayerScores([0, 0]);
    setRound(1);
    setCurrentPlayer(1);
  };

  const handlePlayerScore = (player, score) => {
    const newScores = [...playerScores];
    newScores[player - 1] = score;
    setPlayerScores(newScores);
  };

  return (
    <div className="app bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <Header
        isMultiplayer={isMultiplayer}
        setIsMultiplayer={setIsMultiplayer}
        handleGridSizeChange={handleGridSizeChange}
      />
      <Scoreboard
        score={score}
        timer={timer}
        playerScores={playerScores}
        round={round}
        currentPlayer={currentPlayer}
      />
      {isGameOver ? (
        <div className="game-over text-center">
          <h2 className="text-2xl font-bold">Game Over!</h2>
          <p className="text-lg">Player 1: {playerScores[0]}</p>
          <p className="text-lg">Player 2: {playerScores[1]}</p>
          <p className="text-lg">Winner: {playerScores[0] > playerScores[1] ? 'Player 1' : 'Player 2'}</p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <Gameboard
          cards={cards}
          flippedCards={flippedCards}
          matchedPairs={matchedPairs}
          handleFlip={handleFlip}
          currentPlayer={currentPlayer}
          handlePlayerScore={handlePlayerScore}
        />
      )}
    </div>
  );
}

export default App;


// import React, { useState, useEffect } from 'react';
// import Header from './components/Header';
// import Gameboard from './components/Gameboard';
// import Scoreboard from './components/Scoreboard';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import axios from 'axios';

// function App() {
//   const [cards, setCards] = useState([]);
//   const [flippedCards, setFlippedCards] = useState([]);
//   const [matchedPairs, setMatchedPairs] = useState([]);
//   const [score, setScore] = useState(0);
//   const [timer, setTimer] = useState(60);
//   const [isGameOver, setIsGameOver] = useState(false);
//   const [isMultiplayer, setIsMultiplayer] = useState(false);
//   const [currentPlayer, setCurrentPlayer] = useState(1); // Track the current player (1 or 2)
//   const [playerScores, setPlayerScores] = useState([0, 0]); // Scores of player 1 and player 2
//   const [round, setRound] = useState(1); // Track the current round
//   const [gridSize, setGridSize] = useState(4); // Default grid size (4x4)

//   useEffect(() => {
//     const fetchWords = async () => {
//       try {
//         const response = await axios.get('https://random-word-api.herokuapp.com/word?number=10');
//         const words = response.data;
//         generateCards(words);
//       } catch (error) {
//         console.error('Error fetching words:', error);
//       }
//     };
//     fetchWords();
//   }, [gridSize]);

//   const generateCards = (words) => {
//     const symbols = words.map((word, index) => ({ id: index, value: word }));
//     const pairs = [...symbols, ...symbols]; // Duplicate for pairs
//     const shuffled = pairs.sort(() => Math.random() - 0.5);
//     setCards(shuffled);
//   };

//   const handleFlip = (index) => {
//     if (flippedCards.length === 2 || matchedPairs.includes(index)) return;

//     const newFlipped = [...flippedCards, index];
//     setFlippedCards(newFlipped);

//     if (newFlipped.length === 2) {
//       const [firstIndex, secondIndex] = newFlipped;
//       if (cards[firstIndex].value === cards[secondIndex].value) {
//         setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
//         setScore((prevScore) => prevScore + 10);
//       } else {
//         setTimeout(() => setFlippedCards([]), 1000); // Flip back cards after 1 second
//       }
//     }

//     if (matchedPairs.length === cards.length - 2) {
//       setIsGameOver(true);
//     }
//   };

//   const nextRound = () => {
//     setRound((prevRound) => prevRound + 1);
//     setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
//     setFlippedCards([]);
//     setMatchedPairs([]);
//     setTimer(60); // Reset timer for next round
//   };

//   const handleGridSizeChange = (size) => {
//     setGridSize(size);
//     resetGame();
//   };

//   const resetGame = () => {
//     setScore(0);
//     setFlippedCards([]);
//     setMatchedPairs([]);
//     setTimer(60);
//     setIsGameOver(false);
//     setPlayerScores([0, 0]);
//     setRound(1);
//     setCurrentPlayer(1);
//   };

//   const handlePlayerScore = (player, score) => {
//     const newScores = [...playerScores];
//     newScores[player - 1] = score;
//     setPlayerScores(newScores);
//   };

//   return (
//     <div className="app bg-white text-gray-900 min-h-screen flex flex-col items-center">
//       <Header
//         isMultiplayer={isMultiplayer}
//         setIsMultiplayer={setIsMultiplayer}
//         handleGridSizeChange={handleGridSizeChange}
//       />
//       <Scoreboard
//         score={score}
//         timer={timer}
//         playerScores={playerScores}
//         round={round}
//         currentPlayer={currentPlayer}
//       />
//       {isGameOver ? (
//         <div className="game-over text-center">
//           <h2 className="text-2xl font-bold">Game Over!</h2>
//           <p className="text-lg">Player 1: {playerScores[0]}</p>
//           <p className="text-lg">Player 2: {playerScores[1]}</p>
//           <p className="text-lg">Winner: {playerScores[0] > playerScores[1] ? 'Player 1' : 'Player 2'}</p>
//           <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded" onClick={resetGame}>
//             Play Again
//           </button>
//         </div>
//       ) : (
//         <Gameboard
//           cards={cards}
//           flippedCards={flippedCards}
//           matchedPairs={matchedPairs}
//           handleFlip={handleFlip}
//           currentPlayer={currentPlayer}
//           handlePlayerScore={handlePlayerScore}
//         />
//       )}
//     </div>
//   );
// }

// export default App;