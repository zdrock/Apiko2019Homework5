const storage = {
  getTasks() {
    if (localStorage.getItem('tasks')) {
      return JSON.parse(localStorage.getItem('tasks'));
    } else {
      return false;
    }
  },
  setTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },
};
export default storage;
