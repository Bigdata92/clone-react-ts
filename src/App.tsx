import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

  const btnStyle = {
    color: "#fff",
    border: "none",
    padding: "5px 9px",
    borderRadius: "50%",
    cursor: "pointer",
    float: "right",
  }; 

  // 동적 처리(체크 여부에 따라) → 함수로 작성
  const getStyle = (completed: boolean) => {
    return {
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: completed ? "line-through" : "none",
    };
  };

  const handleClick = (id: number) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  }

  const handleChange = (e: any) => {
    setValue(e.target.value);
  }

  const handleSubmit = (e: any) => {
    // form 안에 input 전송시 페이지 리로드 방지
    e.preventDefault();

    // 새로운 할 일 데이터
    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    // 원래 있던 할 일에 새로운 할 일 더하기
    setTodoData((prev) => [...prev, newTodo]);
    setValue("");
  };

  const handleCompleteChange = (id: number) => {
    let newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });

    setTodoData(newTodoData);
  };

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

    {todoData.map((data) => (
      <div style={getStyle(data.completed)} key={data.id}>
        <input type="checkbox" defaultChecked={false} onChange={() => handleCompleteChange(data.id)} />
        {data.title}
        <button 
          style={btnStyle} 
          onClick={() => handleClick(data.id)}
        >
          x
        </button>
      </div>
    ))}

      <form style={{ display: "flex" }} onSubmit={handleSubmit}>
        <input
          type='text'
          name='value'
          style={{ flex: "10", padding: "5px" }}
          placeholder="할 일을 입력하세요"
          value={value}
          onChange={handleChange}
        />
        <input
          type='submit'
          value='입력'
          className='btn'
          style={{ flex: "1" }}
        />
      </form>

      </div>
    </div>
  );
}