import React from 'react'
import Square from '../Square/Square'

type BoardProps = {
  squares: (string | null)[]
  onSquareClick: (i: number) => void
}

const Board: React.FC<BoardProps> = ({ squares, onSquareClick }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square key={i} value={square} onClick={() => onSquareClick(i)} />
    ))}
  </div>
)

export default Board
