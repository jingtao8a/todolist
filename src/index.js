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
    renderSquare(i) {
      return <Square 
        value={this.props.currentBoardState.squares[i]} 
        onClick={() =>this.props.onClick(i)}/>;
    }
  
    render() {
      return (
        <div>
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
    constructor(props) {
      super(props);
      this.state = {
        historyOfBoardState:[{
            squares: Array(9).fill(null),
            xIsNext: true,
            change: null,//每一步棋中的更改的坐标
          }],
        stepNumber: 0,
      }
    }
    jumpTo(step) {
      this.setState({
        stepNumber:step,
      })
    }

    handleClick(i) {
      const historyOfBoardState = this.state.historyOfBoardState.slice(0,this.state.stepNumber + 1);//只截取到stepNumber的拷贝
      const currentBoardState = historyOfBoardState[historyOfBoardState.length - 1];//当前棋盘的状态

      const square = currentBoardState.squares.slice();
      if (calculateWinner(square) || square[i]) {//如果当前的square已经填满 或者 赢家已定，直接返回
        return;
      }
      square[i] = currentBoardState.xIsNext ? 'X': 'O';
      let x = Math.floor(i / 3), y = i % 3;
      this.setState({
        historyOfBoardState: historyOfBoardState.concat([{
          squares:square,
          xIsNext:!currentBoardState.xIsNext,
          change: '(' + x + ',' + y + ')',
        }]),
        stepNumber:this.state.stepNumber + 1,
      });//增加历史记录
    }

    render() {
      const historyOfBoardState = this.state.historyOfBoardState;
      const currentBoardState = historyOfBoardState[this.state.stepNumber];//当前棋盘状态

      const winner = calculateWinner(currentBoardState.squares);//计算是否有赢家
      const moves = historyOfBoardState.map((info, step) => {//多少个记录
        const desc = step ? 
          'Go to move #' + step + ' change:' + info.change + (!info.xIsNext ? 'X' : 'O'):
          'Go to game start';
        return (
          <li key={step}>
            <button onClick={() => this.jumpTo(step)}>{desc}</button>
          </li>
        );
      });
      let status;
      if (winner) {
        status = 'winner:' + winner;
      } else {
        status = 'Next player:' + (currentBoardState.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            {<Board currentBoardState={currentBoardState} onClick={(i) => this.handleClick(i)}/>}
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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
    if (squeares[a] && squeares[a] === squeares[b] && squeares[b] === squeares[c]) {
      return squeares[a];//胜者
    }
  }
  return null;//无人获胜
}