/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Drawer, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";      
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import PolicyIcon from "@mui/icons-material/Policy";
import PaletteIcon from "@mui/icons-material/Palette";
import Header from "./components/Header";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import Settings from "./pages/Settings";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Themes from "./pages/Themes";

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
  const [drawerOpen, setDrawerOpen] = useState(false);

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
        setTimeout(() => setFlippedCards([]), 1000);
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

  const toggleDrawer = (open) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const menuItems = [
    { text: "Settings", icon: <SettingsIcon /> },
    { text: "Privacy Policy", icon: <PolicyIcon /> },
    { text: "Themes", icon: <PaletteIcon /> },
  ];

  return (
    <div className="app bg-white text-gray-900 min-h-screen flex flex-col items-center">
      <Router>
      <div className="app">
        <IconButton onClick={toggleDrawer(true)} style={{ position: "absolute", top: "10px", left: "10px" }}>
          <MenuIcon />
        </IconButton>

        <Drawer
          menuItems={menuItems}
          drawerOpen={drawerOpen}
          toggleDrawer={toggleDrawer}
        />

        <Routes>
          <Route path="/" component={App} />
          <Route path="/settings" component={Settings} />
          <Route path="/privacy-policy" component={PrivacyPolicy} />
          <Route path="/themes" component={Themes} />
        </Routes>
      </div>
    </Router>

      <IconButton onClick={toggleDrawer(true)} style={{ position: "absolute", top: "10px", left: "10px" }}>
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div
          style={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            {menuItems.map((item, index) => (
              <ListItem button key={index}>
                {item.icon}
                <ListItemText primary={item.text} style={{ marginLeft: "10px" }} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>

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
          <p className="text-lg">Winner: {playerScores[0] > playerScores[1] ? "Player 1" : "Player 2"}</p>
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
          updateScore={(newScore) => setScore(newScore)}
        />
      )}
    </div>
  );
}

export default App;

