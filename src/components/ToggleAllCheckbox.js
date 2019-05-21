import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, withHandlers, branch, renderNothing, pure } from 'recompose';
import { getUncompletedTasks } from '../modules/tasks/tasksSelectors';
import * as tasksActions from '../modules/tasks/tasksActions';

const ButtonToggleStyled = styled.button`
  position: absolute;
  border: none;
  background: none;
  font-size: 22px;
  color: ${props => (props.checked ? '#737373' : '#e6e6e6')};
  padding-left: 25px;
  padding-bottom: 10px;
  transform: rotate(90deg);
  outline: none;
`;

const ToggleAllCheckboxComponent = ({
  uncompletedTasksExist,
  handleToggleAll,
}) => (
  <ButtonToggleStyled onClick={handleToggleAll} checked={uncompletedTasksExist}>
    ❯
  </ButtonToggleStyled>
);

const mapStateToProps = state => {
  return {
    uncompletedTasksExist: getUncompletedTasks(state).length === 0,
  };
};

const ToggleAllCheckbox = compose(
  connect(
    mapStateToProps,
    {
      onToggleAll: tasksActions.toggleAllTasks,
    }
  ),
  withHandlers({
    handleToggleAll: props => data => {
      props.onToggleAll();
    },
  }),
  pure,
  branch(({ tasks }) => tasks === 0, renderNothing)
)(ToggleAllCheckboxComponent);

export default ToggleAllCheckbox;
