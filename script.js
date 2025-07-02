const board = document.getElementById('board');
const status = document.getElementById('status');
let cells = [];
let currentPlayer = 'X';
let gameActive = true;

function createBoard() {
  board.innerHTML = '';
  cells = [];
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
    cells.push(cell);
  }
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleCellClick(index) {
  if (!gameActive || cells[index].textContent) return;

  cells[index].textContent = currentPlayer;
  cells[index].classList.add('disabled');

  if (checkWin()) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell.textContent)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a].textContent &&
           cells[a].textContent === cells[b].textContent &&
           cells[a].textContent === cells[c].textContent;
  });
}

function restartGame() {
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();
