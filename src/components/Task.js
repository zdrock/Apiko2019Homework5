import React from "react";
import styled from "styled-components";
import { compose, withHandlers, withStateHandlers, pure } from "recompose";

const TaskWrapper = styled.div`
  position: relative;
  width: 100%;
  border-bottom: 1px solid #ededed;
`;

const TaskContent = styled.div`
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: none;
  width: 100%;
  height: 100%;
  padding: 15px 15px 15px 60px;
  box-sizing: border-box;
`;

const DeleteButtonStyled = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  border: 0;
  background: none;
  outline: none;
`;

const StyledCheckbox = styled.button`
  position: absolute;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 1px solid #c4deda;
  outline: none;
  background: none;
  margin-bottom: auto;
  margin-top: auto;
  left: 10px;
  top: 0;
  right: 0;
  bottom: 0;
`;

const CheckmarkStyled = styled.span`
  position: absolute;
  left: 5px;
  top: -1px;
  color: #5dc2af;
  font-size: 24px;
`;

const EditableContent = styled.input.attrs({
  autoFocus: true
})`
  position: relative;
  font-size: 24px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: 1px solid #999999;
  padding: 5px;
  outline: none;
  margin-left: 50px;
  width: 488px;
  height: 45px;
`;

const Task = ({
  toggledTitle,
  checked,
  title,
  editedTitle,
  hovered,
  handleMouseEnter,
  handleMouseLeave,
  handleToggleTask,
  handleEditTitle,
  handleBlur,
  handleToggleTitle,
  handleDeleteTask
}) => (
  <TaskWrapper onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave}>
    {!toggledTitle && (
      <StyledCheckbox onClick={handleToggleTask}>
        {checked && <CheckmarkStyled>✓</CheckmarkStyled>}
      </StyledCheckbox>
    )}

    {toggledTitle && (
      <EditableContent
        value={editedTitle}
        onChange={handleEditTitle}
        onBlur={handleBlur}
        onKeyDown={e => {
          if (e.key === "Enter") {
            handleBlur();
          }
        }}
      />
    )}

    {!toggledTitle && checked ? (
      <TaskContent onClick={handleToggleTitle}>
        <s>{title}</s>
      </TaskContent>
    ) : (
      !toggledTitle && (
        <TaskContent onClick={handleToggleTitle}>{title}</TaskContent>
      )
    )}

    {!toggledTitle && hovered && (
      <DeleteButtonStyled onClick={handleDeleteTask}>×</DeleteButtonStyled>
    )}
  </TaskWrapper>
);

export default compose(
  withStateHandlers(
    { hovered: false, editedTitle: "", toggledTitle: false },
    {
      handleEditTitle: (state, props) => e => ({ editedTitle: e.target.value }),
      handleToggleTitle: (state, props) => () => ({
        toggledTitle: true,
        editedTitle: props.title
      }),
      handleMouseEnter: (state, props) => () => ({ hovered: true }),
      handleMouseLeave: (state, props) => () => ({ hovered: false }),
      handleBlur: (state, props) => () => {
        props.onEditTask({ id: props.id, title: state.editedTitle });
        return { toggledTitle: false };
      }
    }
  ),
  pure,
  withHandlers({
    handleToggleTask: props => event => {
      props.onToggleTask(props.id);
    },
    handleDeleteTask: props => event => {
      props.onDeleteTask(props.id);
    }
  })
)(Task);
