import React from 'react';
import { connect } from 'react-redux';
import * as tasksActions from '../modules/tasks/tasksActions';
import styled from 'styled-components';
import ToggleAllCheckbox from './ToggleAllCheckbox';
import { compose, withStateHandlers } from 'recompose';

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 65px;
  border-bottom: 1px solid #ededed;
`;

const InputStyled = styled.input`
  font-size: 24px;
  font-family: 'Helvetica Neue', Helvetica, Arial;
  border: none;
  width: 100%;
  height: 100%;
  padding: 16px 16px 16px 60px;
  box-sizing: border-box;
  outline: none;
  &::-webkit-input-placeholder {
    color: grey;
  }
`;

const InputComponent = ({ tasksExist, value, onChange, onSubmit }) => (
  <InputWrapper>
    {tasksExist && <ToggleAllCheckbox />}
    <InputStyled
      value={value}
      placeholder="What needs to be done?"
      onChange={onChange}
      onKeyDown={e => {
        if (e.key === 'Enter') {
          onSubmit();
        }
      }}
    />
  </InputWrapper>
);

const mapStateToProps = state => {
  return {
    tasksExist: state.tasks.tasks.length > 0,
  };
};

export default compose(
  connect(
    mapStateToProps,
    { createTask: tasksActions.createTask }
  ),
  withStateHandlers(
    { value: '' },
    {
      onChange: (state, props) => e => ({ value: e.target.value }),
      onSubmit: (state, props) => () => {
        if (!state.value) {
          return {};
        }
        props.createTask(state.value);
        return { value: '' };
      },
    }
  )
)(InputComponent);
