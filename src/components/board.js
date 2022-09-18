import React from 'react';
import { Square } from './square';

export class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    }
  }

  renderSquare(squareNumber) {
    return (
      <Square
        value={this.state.squares[squareNumber]}
        onClick={() => this.handleClick(squareNumber)}
      />
    );
  }

  handleClick(squareNumber) {
    this.handleGameSteep(squareNumber);
  }

  handleGameSteep(squareNumber) {
    const squares = this.state.squares.slice();
    squares[squareNumber] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
        squares: squares,
        xIsNext: !this.state.xIsNext
      });
  }

  render() {
    const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
