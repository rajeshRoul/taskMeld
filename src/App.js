import React from "react";
import TaskBoard from "./components/TaskBoard";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h1>Task Meld</h1>
      <TaskBoard />
    </div>
  );
};

export default App;
