import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          className={`task-card ${snapshot.isDragging ? "dragging" : ""}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={onClick}
        >
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
