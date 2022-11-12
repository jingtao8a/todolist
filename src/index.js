import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    render() {
      return (
        <button 
          className="square"
          onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }
  }
  
  class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squeares: [1, 2, 3, 4, 5, 6, 7, 8, 9].fill(null),
        xIsNext: true,
      }
    }

    handleClick(i) {
      const square = this.state.squeares.slice();
      if (calculateWinner(square) || square[i]) {
        return;
      }
      square[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        squeares: square,
        xIsNext: !this.state.xIsNext,});
    }

    renderSquare(i) {
      return <Square 
        value={this.state.squeares[i]} 
        onClick={() =>this.handleClick(i)}/>;
    }
  
    render() {
      const winner = calculateWinner(this.state.squeares);
      let status;
      if (winner) {
        status = 'winner:' + winner;
      } else {
        status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
      }
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
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            {<Board />}
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);
  

function calculateWinner(squeares) {
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
  for (let i = 0; i < lines.length; ++i) {
    const [a, b, c] = lines[i];
    if (squeares[a] && squeares[a] == squeares[b] && squeares[b] == squeares[c]) {
      return squeares[a];//胜者
    }
  }
  return null;//无人获胜
}