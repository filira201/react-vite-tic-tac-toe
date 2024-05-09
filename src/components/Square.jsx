const Square = ({ value, onClick, isWinnerSquare }) => {
  return (
    <button
      onClick={onClick}
      className="square"
      style={{ background: isWinnerSquare ? "#15df26" : "" }}
    >
      {value}
    </button>
  );
};

export default Square;
