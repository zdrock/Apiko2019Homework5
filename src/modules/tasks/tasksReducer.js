import uuid from 'uuid';
import * as tasksActions from './tasksActions';
import { handleActions } from '@letapp/redux-actions';

const reducer = handleActions(
  {
    [tasksActions.createTask]: (state, action) => ({
      tasks: state.tasks.concat({
        id: uuid.v4(),
        title: action.payload,
        checked: false,
      }),
    }),
    [tasksActions.toggleAllTasks]: (state, action) => {
      let newTasks;
      const { tasks } = state;
      if (tasks.filter(t => !t.checked).length === 0) {
        newTasks = tasks.map(task => {
          return {
            ...task,
            checked: !task.checked,
          };
        });
      } else {
        newTasks = tasks.map(task => {
          return {
            ...task,
            checked: true,
          };
        });
      }
      return { tasks: newTasks };
    },
    [tasksActions.deleteTask]: (state, action) => {
      const id = action.payload;

      return {
        tasks: state.tasks.filter(task => task.id !== id),
      };
    },
    [tasksActions.toggleTask]: (state, action) => {
      const id = action.payload;
      const newTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            checked: !task.checked,
          };
        } else {
          return task;
        }
      });

      return {
        ...state,
        tasks: newTasks,
      };
    },
    [tasksActions.editTask]: (state, action) => {
      const { id, title } = action.payload;
      const newTasks = state.tasks.map(task => {
        if (task.id === id) {
          return {
            ...task,
            title: title,
          };
        } else {
          return task;
        }
      });

      return {
        ...state,
        tasks: newTasks,
      };
    },
    [tasksActions.deleteCheckedTasks]: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.checked),
      };
    },
    [tasksActions.getStoredTasksGotten]: (state, action) => {
      return {
        tasks: [...action.payload],
      };
    },
  },
  { tasks: [] }
);

export default reducer;
