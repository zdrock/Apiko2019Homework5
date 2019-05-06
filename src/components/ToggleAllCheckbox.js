import React from "react";
import { connect } from "react-redux";
import { toggleAll } from "../actions/tasksActions";
import styled from "styled-components";
import { compose, withHandlers, branch, renderNothing, pure } from "recompose";

const ButtonToggleStyled = styled.button`
    position:absolute; 
    border: none; 
    background: none;    
    font-size: 22px;
    color:${props => (props.checked ? "#737373" : "#e6e6e6")}; 
    padding-left:25px
    padding-bottom:10px
    transform: rotate(90deg);
    outline:none;
`;

const ToggleAllCheckboxComponent = ({ itemsLeft, handleToggleAll }) => (
  <ButtonToggleStyled onClick={handleToggleAll} checked={itemsLeft === 0}>
    ❯
  </ButtonToggleStyled>
);

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  const itemsLeft = tasks.filter(t => !t.checked).length;

  return {
    tasks,
    itemsLeft
  };
};

const mapDispatchToProps = dispatch => ({
  onToggleAll: () => dispatch(toggleAll())
});

const ToggleAllCheckbox = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    handleToggleAll: props => data => {
      props.onToggleAll();
    }
  }),
  pure,
  branch(({ tasks }) => tasks === 0, renderNothing)
)(ToggleAllCheckboxComponent);

export default ToggleAllCheckbox;
