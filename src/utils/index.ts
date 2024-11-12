export const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

const minimax = (squares: (string | null)[], isMaximizing: boolean): number => {
  const winner = calculateWinner(squares)
  if (winner === 'O') return 1
  if (winner === 'X') return -1
  if (squares.every((square) => square !== null)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'O'
        const score = minimax(squares, false)
        squares[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        squares[i] = 'X'
        const score = minimax(squares, true)
        squares[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

export const getAIMove = (squares: (string | null)[]): number => {
  let bestScore = -Infinity
  let move = -1

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      squares[i] = 'O'
      const score = minimax(squares, false)
      squares[i] = null

      if (score > bestScore) {
        bestScore = score
        move = i
      }
    }
  }
  return move
}
