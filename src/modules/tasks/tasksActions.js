import { createAction, combineActions } from '@letapp/redux-actions';

export const createTask = createAction('mytodo/tasks/CREATE_TASK');
export const toggleAllTasks = createAction('mytodo/tasks/TOGGLE_ALL_TASKS');
export const deleteTask = createAction('mytodo/tasks/DELETE_TASK');
export const toggleTask = createAction('mytodo/tasks/TOGGLE_TASK');
export const editTask = createAction('mytodo/tasks/EDIT_TASK');
export const deleteCheckedTasks = createAction(
  'mytodo/tasks/DELETE_CHECKED_TASKS'
);
export const getStoredTasksStarted = createAction(
  'mytodo/tasks/GET_STORED_TASKS_STARTED'
);
export const getStoredTasksGotten = createAction(
  'mytodo/tasks/GET_STORED_TASKS_GOTTEN'
);
export const setTasksToStore = createAction('mytodo/tasks/SET_TASKS_TO_STORE');
