import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./style.module.css";
import {
  columnDropdownOptions,
  columnKeys,
} from "../../constants/ColumnConstants";

const AddTaskModal = ({ task, addOrUpdateTask, deleteTask, closeModal }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedColumn, setSelectedColumn] = useState(columnKeys[0]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setSelectedColumn(task.status);
    }
  }, [task]);

  const handleSubmit = () => {
    const newTask = {
      id: task ? task.id : null,
      title,
      description,
      status: selectedColumn,
    };
    addOrUpdateTask(newTask);
    closeModal();
  };

  const handleDelete = () => {
    if (task) {
      deleteTask(task.id);
      closeModal();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{task ? "Edit Task" : "Add Task"}</h3>

        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.modalInput}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.modalTextarea}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Task Status</label>
          <Select
            value={columnDropdownOptions.find(
              ({ value }) => value === selectedColumn
            )}
            options={columnDropdownOptions}
            onChange={({ value }) => setSelectedColumn(value)}
            className={styles.modalSelect}
          />
        </div>

        <div className={styles.modalActions}>
          <button
            className={`${styles.modalBtn} ${styles.primaryBtn}`}
            onClick={handleSubmit}
          >
            {task ? "Update Task" : "Add Task"}
          </button>
          {task && (
            <button
              className={`${styles.modalBtn} ${styles.deleteBtn}`}
              onClick={handleDelete}
            >
              Delete Task
            </button>
          )}
          <button
            className={`${styles.modalBtn} ${styles.cancelBtn}`}
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
