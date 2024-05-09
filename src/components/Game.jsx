import { useState } from "react";
import Board from "./Board";
import SortButton from "./SortButton";

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;

    if (move > 0) {
      description = `Go to move #${move}`;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        {move === currentMove ? (
          <div style={{ margin: "5px 0" }}>You are at move #{move}</div>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{isAscending ? moves : [...moves].reverse()}</ol>
      </div>

      <div
        style={{
          marginLeft: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SortButton
          value={!isAscending ? "Ascending" : "Descending"}
          onSort={handleSort}
        />
      </div>
    </div>
  );
};

export default Game;
