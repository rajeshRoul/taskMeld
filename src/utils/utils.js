export const getTasksFromCache = () => {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : null;
  };
  
  export const setTasksToCache = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  