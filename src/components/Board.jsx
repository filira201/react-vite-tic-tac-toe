import Square from "./Square";

const Board = ({ xIsNext, squares, onPlay }) => {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return {
          winner: squares[a],
          winnerSquares: lines[i],
        };
      }
    }

    return {
      winner: null,
      winnerSquares: [],
    };
  }

  const handleClick = (index) => {
    if (calculateWinner(squares).winner || squares[index]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  };

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo.winner) {
    status = "Winner " + winnerInfo.winner;
  } else if (squares.includes(null)) {
    status = "Next player " + (xIsNext ? "X" : "O");
  } else {
    status = "Draw";
  }

  const addBoard = () => {
    let board = [];
    for (let i = 0; i < 3; i++) {
      const boardRow = [];
      for (let j = 0; j < 3; j++) {
        boardRow.push(
          <Square
            key={i * 3 + j}
            value={squares[i * 3 + j]}
            onClick={() => handleClick(i * 3 + j)}
            isWinnerSquare={winnerInfo.winnerSquares.includes(i * 3 + j)}
          />
        );
      }
      board.push(
        <div key={i} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className="status">{status}</div>
      {addBoard()}
    </>
  );
};

export default Board;
