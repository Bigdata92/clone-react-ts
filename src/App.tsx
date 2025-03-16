import React, {Component} from 'react';
import './App.css';

export default class App extends Component {
  btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  }

  // 동적 처리(체크 여부에 따라) → 함수로 작성
  getStyle = () => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: "none",
    };
  };

  todoData = [
    {
      id: 1,
      title: "공부하기",
      completed: true,
    },
    {
      id: 2,
      title: "운동하기",
      completed: false,
    },
    {
      id: 3,
      title: "책 읽기",
      completed: false,
    },
  ]

  render() {
    return (
      <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>할 일 목록</h1>
          </div>

      {this.todoData.map((data) => (
        <div style={this.getStyle()} key={data.id}>
          <input type="checkbox" defaultChecked={false} />
          {data.title}
          <button style={this.btnStyle}>x</button>
        </div>
      ))}
        </div>
      </div>
    );
  }
}