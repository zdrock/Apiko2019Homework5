import React from 'react';
import PropTypes from 'prop-types';
import Task from './Task';
import { connect } from 'react-redux';
import { getFilteredTasks } from '../modules/tasks/tasksSelectors';

const TasksListComponent = ({ tasks }) => {
  const tasksList = tasks.map(task => (
    <Task
      id={task.id}
      key={task.id}
      title={task.title}
      checked={task.checked}
    />
  ));
  return <>{tasksList}</>;
};

TasksListComponent.propTypes = {
  tasks: PropTypes.array.isRequired,
};

const mapStateToProps = state => {
  return {
    tasks: getFilteredTasks(state),
  };
};

const TasksList = connect(
  mapStateToProps,
  null
)(TasksListComponent);

export default TasksList;
