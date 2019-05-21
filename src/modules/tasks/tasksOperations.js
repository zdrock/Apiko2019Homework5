import * as tasksActions from './tasksActions';
import storage from '../../api/storage';

export const getTasks = () => async (dispatch, getState) => {
  const tasks = storage.getTasks();
  if (tasks) {
    dispatch(tasksActions.getStoredTasks(tasks));
  }
};

export const setTasks = () => async (dispatch, getState) => {
  const tasks = getState().tasks.tasks;
  storage.setTasks(tasks);
};
