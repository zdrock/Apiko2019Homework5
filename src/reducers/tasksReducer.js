import storage from "../api/storage";

const initialState = {
  tasks: []
};

export default function tasksReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_TASKS": {
      return {
        ...state,
        tasks: action.payload.tasks
      };
    }
    case "CREATE_TASK": {
      const newTask = action.payload;
      const newTasks = state.tasks.concat(newTask);

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "EDIT_TASK": {
      const { id, title } = action.payload;
      const newTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            title: title
          };
        } else {
          return task;
        }
      });

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "DELETE_TASK": {
      const { id } = action.payload;
      const newTasks = state.tasks.filter(task => task.id !== id);

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "DELETE_CHECKED_TASKS": {
      const newTasks = state.tasks.filter(task => !task.checked);

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "TOGGLE_TASK": {
      const { id } = action.payload;
      const newTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            checked: !task.checked
          };
        } else {
          return task;
        }
      });

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "TOGGLE_ALL": {
      let newTasks;
      if (state.tasks.filter(t => !t.checked).length === 0) {
        newTasks = state.tasks.map(task => {
          return {
            ...task,
            checked: !task.checked
          };
        });
      } else {
        newTasks = state.tasks.map(task => {
          return {
            ...task,
            checked: true
          };
        });
      }

      return {
        ...state,
        tasks: newTasks
      };
    }
    case "SAVE_TO_LOCAL": {
      const { tasks } = state;
      storage.setTasks(tasks);

      return state;
    }
    default: {
      return state;
    }
  }
}
