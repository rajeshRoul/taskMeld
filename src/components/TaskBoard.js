import React, { useState, useEffect, useMemo } from "react";
import Column from "./Column";
import { DragDropContext } from "react-beautiful-dnd";
import { getTasksFromCache, setTasksToCache } from "../utils/utils";
import AddTaskModal from "./AddTaskModal";
import { columnKeys, columnsOptions } from "../constants/ColumnConstants";

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);
  const [activeColumn, setActiveColumn] = useState("");

  useEffect(() => {
    const cachedTasks = getTasksFromCache();
    if (cachedTasks) {
      setTasks(cachedTasks);
    }
  }, []);

  const tasksByStatus = useMemo(() => {
    return {
      [columnKeys[0]]: tasks.filter((task) => task.status === columnKeys[0]),
      [columnKeys[1]]: tasks.filter((task) => task.status === columnKeys[1]),
      [columnKeys[2]]: tasks.filter((task) => task.status === columnKeys[2]),
    };
  }, [tasks]);

  const addOrUpdateTask = (task) => {
    const updatedTasks = [...tasks];
    if (task.id) {
      const taskIndex = updatedTasks.findIndex((t) => t.id === task.id);
      if (taskIndex !== -1) {
        updatedTasks[taskIndex] = task;
      }
    } else {
      task.id = Date.now();
      updatedTasks.push(task);
    }
    setTasks(updatedTasks);
    setTasksToCache(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    setTasksToCache(updatedTasks);
  };

  const moveTask = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setTasksToCache(updatedTasks);
  };

  const changePosition = (srcIndex, destIndex, status) => {
    const srcID = tasksByStatus[status][srcIndex].id;
    const destID = tasksByStatus[status][destIndex].id;
    const fromIndex = tasks.findIndex((task) => task.id === srcID);
    const toIndex = tasks.findIndex((task) => task.id === destID);
    if (
      fromIndex < 0 ||
      fromIndex >= tasks.length ||
      toIndex < 0 ||
      toIndex >= tasks.length
    )
      return;

    const updatedTasks = [...tasks];
    const item = updatedTasks.splice(fromIndex, 1)[0];
    updatedTasks.splice(toIndex, 0, item);
    setTasks(updatedTasks);
    setTasksToCache(updatedTasks);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      changePosition(source.index, destination.index, destination.droppableId);
      return;
    }
    moveTask(parseInt(draggableId), destination.droppableId);
  };

  const handleTaskClick = (task) => {
    setActiveTask(task);
    setIsModalOpen(true);
  };

  const handleAddNewTask = (columnId) => {
    setActiveTask(null);
    setActiveColumn(columnId);
    setIsModalOpen(true);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <button className="add-task-button" onClick={handleAddNewTask}>
        + Add Task
      </button>
      <div className="task-board">
        {columnKeys.map((status) => (
          <Column
            key={status}
            column={{ id: status, title: columnsOptions[status] }}
            tasks={tasksByStatus[status] || []}
            onTaskClick={handleTaskClick}
            onAddNewTask={() => handleAddNewTask(status)}
          />
        ))}
        {isModalOpen && (
          <AddTaskModal
            columnId={activeColumn}
            task={activeTask}
            addOrUpdateTask={addOrUpdateTask}
            deleteTask={deleteTask}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
