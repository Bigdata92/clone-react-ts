import React, { useState } from 'react';
import './App.css';
import Lists from './components/Lists';
import Form from './components/Form';

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [value, setValue] = useState("");

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
        <Form value={value} setValue={setValue} setTodoData={setTodoData} handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}