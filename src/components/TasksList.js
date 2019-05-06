import React from "react";
import PropTypes from "prop-types";
import Task from "./Task";
import { connect } from "react-redux";
import { deleteTask, toggleTask, editTask } from "../actions/tasksActions";

const TasksListComponent = ({
  tasks,
  pathname,
  onDeleteTask,
  onToggleTask,
  onEditTask
}) => {
  let filteredTasks = [...tasks];

  if (pathname === "/new") {
    filteredTasks = filteredTasks.filter(task => !task.checked);
  }
  if (pathname === "/completed") {
    filteredTasks = filteredTasks.filter(task => task.checked);
  }

  const tasksList = filteredTasks.map(task => (
    <Task
      id={task.id}
      key={task.id}
      title={task.title}
      checked={task.checked}
      onDeleteTask={onDeleteTask}
      onToggleTask={onToggleTask}
      onEditTask={onEditTask}
    />
  ));
  return <>{tasksList}</>;
};

TasksListComponent.propTypes = {
  tasks: PropTypes.array.isRequired,
  pathname: PropTypes.string.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
  onToggleTask: PropTypes.func.isRequired,
  onEditTask: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  const { pathname } = state.router.location;
  return {
    tasks: tasks,
    pathname: pathname
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteTask: id => dispatch(deleteTask(id)),
  onToggleTask: id => dispatch(toggleTask(id)),
  onEditTask: ({ id, title }) => dispatch(editTask({ id, title }))
});

const TasksList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksListComponent);

export default TasksList;
