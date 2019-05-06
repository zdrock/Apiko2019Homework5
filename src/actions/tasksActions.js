import uuid from "uuid";
import storage from "../api/storage";

export function getTasks() {
  const tasks = storage.getTasks() || [];

  return {
    type: "GET_TASKS",
    payload: {
      tasks: tasks
    }
  };
}

export function createTask(title) {
  const newTask = {
    id: uuid.v4(),
    title,
    checked: false
  };

  return dispatch => {
    dispatch({
      type: "CREATE_TASK",
      payload: {
        ...newTask
      }
    });
    dispatch(saveToLocal());
  };
}

export function deleteTask(id) {
  return dispatch => {
    dispatch({
      type: "DELETE_TASK",
      payload: {
        id
      }
    });
    dispatch(saveToLocal());
  };
}

export function toggleTask(id) {
  return dispatch => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: {
        id
      }
    });
    dispatch(saveToLocal());
  };
}

export function toggleAll() {
  return dispatch => {
    dispatch({
      type: "TOGGLE_ALL"
    });
    dispatch(saveToLocal());
  };
}

export function editTask({ id, title }) {
  return dispatch => {
    if (title.trim() === "") {
      dispatch({
        type: "DELETE_TASK",
        payload: {
          id
        }
      });
    } else {
      dispatch({
        type: "EDIT_TASK",
        payload: {
          id,
          title
        }
      });
    }
    dispatch(saveToLocal());
  };
}

export function deleteCheckedTasks() {
  return dispatch => {
    dispatch({
      type: "DELETE_CHECKED_TASKS"
    });
    dispatch(saveToLocal());
  };
}

function saveToLocal() {
  return {
    type: "SAVE_TO_LOCAL"
  };
}
