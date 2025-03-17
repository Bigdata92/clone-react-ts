import React from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import List from "./List";

export default function Lists({ todoData, setTodoData }) {

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
                    <List 
                      key={data.id}
                      id={data.id}
                      title={data.title}
                      completed={data.completed}
                      todoData={todoData}
                      setTodoData={setTodoData}
                      provided={provided}
                      snapshot={snapshot}
                    />
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
