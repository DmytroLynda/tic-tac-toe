import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import React from 'react';
import { Square } from './square';

export class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null)
    }
  }

  renderSquare(squareNumber) {
    return <Square 
      value={this.state.squares[squareNumber]}
      onClick={() => this.handleClick(squareNumber)}/>;
  }

  handleClick(squareNumber) {
    this.handleGameSteep(squareNumber);
  }

  handleGameSteep(squareNumber) {
    let squares = this.state.squares.splice();
    squares[squareNumber] = 'X';
    this.setState(squares);
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
