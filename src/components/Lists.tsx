import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Lists({ todoData, setTodoData }) {

  const handleClick = (id: number) => {
    let newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
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

  const handleEnd = (result) => {
    console.log(result);

    // 목적지 x → 함수 종료
    if (!result.destination) return;
    // React 불변성 유지
    const newTodoData = [...todoData];

    // 1. 변경하려는 아이템 배열에서 제거
    const [reorderedItem] = newTodoData.splice(result.source.index, 1);
    // 2. 원하는 자리에 insert
    newTodoData.splice(result.destination.index, 0, reorderedItem);
    setTodoData(newTodoData);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div key={data.id} 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} {...provided.dragHandleProps}
                        className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded `}
                    >
                      <div className="items-center">
                        <input 
                          type="checkbox" 
                          defaultChecked={false} 
                          onChange={() => handleCompleteChange(data.id)} 
                        />
                        <span className={data.completed ? "line-through" : undefined}>{data.title}</span>
                      </div>
                      <div className="items-center">
                        <button className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
