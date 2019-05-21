import { call, fork, put, take, select } from 'redux-saga/effects';
import * as tasksActions from '../../modules/tasks/tasksActions';
import storage from '../../api/storage';

export default function* tasksSaga() {
  yield fork(watchChatChanges);
  yield fork(watchGetTasks);
}

function* watchChatChanges() {
  while (true) {
    yield take([
      tasksActions.createTask,
      tasksActions.toggleAllTasks,
      tasksActions.deleteTask,
      tasksActions.toggleTask,
      tasksActions.editTask,
      tasksActions.deleteCheckedTasks,
    ]);
    const state = yield select();
    storage.setTasks(state.tasks.tasks);
  }
}

function* watchGetTasks() {
  while (true) {
    yield take([tasksActions.getStoredTasksStarted]);
    const storedTasks = yield call(storage.getTasks);
    if (storedTasks) {
      yield put({
        type: tasksActions.getStoredTasksGotten,
        payload: storedTasks,
      });
    }
  }
}
