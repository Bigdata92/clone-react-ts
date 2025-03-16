import React, { useState } from 'react';
import './App.css';
import Lists from './components/Lists';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

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

  return (
    <div className="container">
      <div className="todoBlock">
        <div className="title">
          <h1>할 일 목록</h1>
        </div>

        <Lists todoData={todoData} setTodoData={setTodoData} />

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