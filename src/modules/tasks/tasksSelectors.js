import { createSelector } from 'reselect';

const getTasks = state => state.tasks.tasks;
const getPathname = state => state.router.location.pathname;

export const getFilteredTasks = createSelector(
  [getTasks, getPathname],
  (tasks, pathname) => {
    if (pathname === '/new') {
      return tasks.filter(task => !task.checked);
    }
    if (pathname === '/completed') {
      return tasks.filter(task => task.checked);
    }

    return tasks;
  }
);

export const getUncompletedTasks = createSelector(
  [getTasks],
  tasks => {
    return tasks.filter(t => !t.checked);
  }
);

export const getCompletedTasks = createSelector(
  [getTasks],
  tasks => {
    return tasks.filter(t => t.checked);
  }
);
