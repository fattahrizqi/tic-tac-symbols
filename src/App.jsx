import { useState } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import { motion } from "framer-motion";
import "./App.css";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Player({ value, onPlayerClick }) {
  return (
    <button className="mini-square" onClick={onPlayerClick}>
      {value}
    </button>
  );
}

// style visibility
function setStyle(e, event, transform) {
  if (!transform) {
    if (event == "show") {
      e.style.visibility = "visible";
      e.style.opacity = 1;
      e.style.transform = "scale(1)";
    } else if (event == "hidden") {
      e.style.visibility = "hidden";
      e.style.opacity = 0;
      e.style.transform = "scale(0)";
    } else if (event == "none") {
      e.style.display = "none";
    }
  } else {
    if (event == "show") {
      e.style.visibility = "visible";
      e.style.opacity = 1;
      e.style.transform = "translate(-50%, -50%) scale(1)";
    }
  }
}

export default function Board() {
  let [squares, setSquares] = useState(Array(9).fill(null));
  let [nextPlayer, setNexPlayer] = useState(true);
  let [player1, setPlayer1] = useState(null);
  let [player2, setPlayer2] = useState(null);
  let [frame, setFrame] = useState("welcome");

  // set symbol for player
  function setPlayer(e, p, value) {
    if (p === 1) {
      if (value == e.innerHTML) {
        for (let i = 0; i < e.parentElement.children.length; i++) {
          if (e.parentElement.children[i] !== e) {
            e.parentElement.children[i].classList.remove("active");
          }
          if (value !== player2) {
            e.classList.add("active");
            setPlayer1(value);
          }
        }
      }
    } else {
      if (value == e.innerHTML) {
        for (let i = 0; i < e.parentElement.children.length; i++) {
          if (e.parentElement.children[i] !== e) {
            e.parentElement.children[i].classList.remove("active");
          }
          if (value !== player1) {
            e.classList.add("active");
            setPlayer2(value);
          }
        }
      }
    }
  }

  // handle square on click
  function handleClick(i) {
    const nextSquares = squares.slice();

    if (squares[i] || calculateWinner(squares)) {
      return 0;
    }

    if (nextPlayer) {
      nextSquares[i] = player1;
    } else {
      nextSquares[i] = player2;
    }
    setSquares(nextSquares);
    setNexPlayer(!nextPlayer);
  }

  function reset() {
    setSquares(Array(9).fill(null));
  }

  // set visibility content
  const winner = calculateWinner(squares);
  const wrapperTurn = document.querySelector(".wrapper.turn");
  const innerGameBoard = document.querySelector(".board .game");
  const wrapperWinner = document.querySelector(".winner");
  const welcomeBoard = document.querySelector(".welcome");
  const choosePlayerBoard = document.querySelector(".choose-player");
  const gameBoard = document.querySelector(".board");
  const miniSquare = document.querySelectorAll(".mini-square");

  if (winner) {
    setStyle(wrapperWinner, "show", true);
    setStyle(innerGameBoard, "hidden");
  } else {
    if (wrapperTurn) {
      if (nextPlayer == 1) {
        wrapperTurn.children[0].classList.add("active");
        wrapperTurn.children[1].classList.remove("active");
      } else {
        wrapperTurn.children[0].classList.remove("active");
        wrapperTurn.children[1].classList.add("active");
      }
    }
  }

  function linkTo(e) {
    if (e == "welcome") {
      setStyle(welcomeBoard, "show");
      setStyle(choosePlayerBoard, "hidden");
    } else if (e == "choosePlayer") {
      setStyle(welcomeBoard, "hidden");
      setStyle(gameBoard, "hidden");
      setStyle(wrapperWinner, "hidden");
      setStyle(choosePlayerBoard, "show");

      // set all state null & remove class active
      setSquares(Array(9).fill(null));
      setPlayer1(null);
      setPlayer2(null);
      miniSquare.forEach((e) => {
        e.classList.remove("active");
      });
    } else if (e == "startGame") {
      if (player1 != null && player2 != null) {
        setStyle(choosePlayerBoard, "hidden");
        setStyle(gameBoard, "show");
        setStyle(innerGameBoard, "show");
        console.log(gameBoard);
      }
    }
  }
  // end set visibility content

  const [text] = useTypewriter({
    words: ["Toe", "Symbols"],
    loop: {},
  });

  return (
    <div className="container">
      {/* welcome  */}
      <div className="welcome">
        <motion.div className="symbol" initial={{ scale: 0, y: 100 }} animate={{ scale: 1, y: 0 }}>
          ♠️
        </motion.div>
        <h1>
          Tic Tac <span>{text}</span>
          <Cursor />
        </h1>
        <motion.button onClick={() => linkTo("choosePlayer")} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          Choose Player
        </motion.button>
        <p>
          By.
          <a href="https://instagram.com/tahrizqi_" target="blank">
            FattahRizqi
          </a>
        </p>
      </div>

      {/* choose player */}
      <div className="choose-player">
        <div className="wrapper">
          <h3>Choose player 1</h3>
          <div className="board-row">
            <Player value={"♣️"} onPlayerClick={(e) => setPlayer(e.target, 1, "♣️")} />
            <Player value={"♦️"} onPlayerClick={(e) => setPlayer(e.target, 1, "♦️")} />
            <Player value={"♠️"} onPlayerClick={(e) => setPlayer(e.target, 1, "♠️")} />
            <Player value={"♥️"} onPlayerClick={(e) => setPlayer(e.target, 1, "♥️")} />
          </div>

          <h3 style={{ marginTop: ".5rem" }}>Choose player 2</h3>
          <div className="board-row">
            <Player value={"♣️"} onPlayerClick={(e) => setPlayer(e.target, 2, "♣️")} />
            <Player value={"♦️"} onPlayerClick={(e) => setPlayer(e.target, 2, "♦️")} />
            <Player value={"♠️"} onPlayerClick={(e) => setPlayer(e.target, 2, "♠️")} />
            <Player value={"♥️"} onPlayerClick={(e) => setPlayer(e.target, 2, "♥️")} />
          </div>

          <div className="wrapper-btn">
            <button className="back-btn" onClick={() => linkTo("welcome")}>
              Back
            </button>
            <button className="start-btn" onClick={() => linkTo("startGame")}>
              Start Game
            </button>
          </div>
        </div>
      </div>

      {/* game board */}
      <div className="board">
        <div className="game">
          <div className="wrapper turn">
            <div className="bg-effect"></div>
            <div className="player1">{player1}</div>
            <div className="player2">{player2}</div>
          </div>
          <div className="wrapper">
            <div className="board-row">
              <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
              <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
              <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
            </div>
            <div className="board-row">
              <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
              <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
              <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
            <div className="board-row">
              <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
              <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
              <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
            {/* <button onClick={() => reset()}>Reset</button> */}
          </div>
          <div className="wrapper wrapper-btn">
            <button className="back-btn" onClick={() => linkTo("choosePlayer")}>
              Back
            </button>
            <button className="start-btn" onClick={() => reset()}>
              Reset
            </button>
          </div>
        </div>
      </div>
      {/* winner */}
      <div className="winner">
        <div className="wrapper content">
          <h3>
            Congratulations <br></br> winner 🎉 !!
          </h3>
          <h1>{winner}</h1>
          <h5>Player {winner == player1 ? "one" : "two"}</h5>
        </div>

        <div className="wrapper wrapper-btn">
          <button className="start-btn" onClick={() => linkTo("choosePlayer")}>
            Restart
          </button>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
