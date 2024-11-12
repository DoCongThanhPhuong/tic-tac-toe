import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Board from './components/Board/Board'
import { calculateWinner, getAIMove } from './utils'

const App: React.FC = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null))
  const [isXNext, setIsXNext] = useState(true)

  const winner = calculateWinner(squares)
  const currentPlayer = isXNext ? 'X' : 'O'

  useEffect(() => {
    if (winner) {
      if (currentPlayer === 'X') {
        toast.error('LOSS!')
      } else {
        toast.success('WON!')
      }
    } else if (squares.every((square) => square)) {
      toast.info('DRAW!')
    }
  }, [winner, squares, currentPlayer])

  const handleSquareClick = (index: number) => {
    if (squares[index] || winner) return

    const newSquares = squares.slice()
    newSquares[index] = currentPlayer
    setSquares(newSquares)
    setIsXNext(!isXNext)

    if (!winner && currentPlayer === 'X') {
      setTimeout(() => {
        const aiMove = getAIMove(newSquares)
        if (aiMove !== -1) {
          newSquares[aiMove] = 'O'
          setSquares([...newSquares])
          setIsXNext(true)
        }
      }, 500)
    }
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null))
    setIsXNext(true)
    toast.dismiss()
  }

  return (
    <div className="app">
      <Board squares={squares} onSquareClick={handleSquareClick} />
      <button onClick={resetGame}>Restart Game</button>
      <ToastContainer position="top-center" theme="light" />
    </div>
  )
}

export default App
