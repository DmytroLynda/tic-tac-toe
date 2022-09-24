import React from 'react';
import { Board } from './board';

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      stepNumber: 0
    };
  }

  calculateWinner(squares) {
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

  handleClick(squareNumber) {
    this.handleGameSteep(squareNumber);
  }

  handleGameSteep(squareNumber) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[squareNumber]){
      return;
    }

    squares[squareNumber] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 === 0)
    });
  }

  formatMoveRecord(move) {
    const prevRecord = this.state.history[move - 1];
    if (!prevRecord) {
      return '';
    }

    const record = this.state.history[move];

    for(let i = 0; i < record.squares.length; i++) {
      if (!prevRecord.squares[i] && record.squares[i]){
        let col = (i + 1) % 3;
        if (col === 0) { col = 3; }
        const row = Math.ceil((i + 1) / 3);
        const moveSign = record.squares[i];
        return `[${col}, ${row}]: ${moveSign}`
      }
    }
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        `Go to move #${move} ${this.formatMoveRecord(move)}` :
        'Go to game start';

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(squareNumber) => this.handleClick(squareNumber)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
