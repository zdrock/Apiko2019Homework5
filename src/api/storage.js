const storage = {
  getTasks() {
    if (sessionStorage.getItem("tasks")) {
      return JSON.parse(sessionStorage.getItem("tasks"));
    } else {
      return false;
    }
  },
  setTasks(tasks) {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }
};
export default storage;
