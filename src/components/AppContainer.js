import { Route, Switch, NavLink } from "react-router-dom";
import React from "react";
import Input from "./Input";
import TasksList from "./TasksList";
import { getTasks, deleteCheckedTasks } from "../actions/tasksActions";
import { connect } from "react-redux";
import styled from "styled-components";
import { compose, lifecycle } from "recompose";

const AppContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
`;

const NavigationContainer = styled.div`
  width: 100%;
  height: 40px;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
`;

const NavLinksContainer = styled.div`
  padding-left: 40px;
`;

const NavLinkStyled = styled(NavLink)`
  padding: 3px 7px 3px 7px;
  text-decoration: none;
  color: #777;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: 1px solid white;
  border-radius: 3px;
  margin-left: 5px;
  margin-right: 5px;
  :hover {
    border: 1px solid #f7eaea;
  }
  &.active {
    border: 1px solid #efd5d5;
  }
`;

const ClearCompletedButton = styled.button`
  color: #777;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  visibility: ${props => (props.completedTasksExist ? "visible" : "hidden")};
  :hover {
    text-decoration: underline;
  }
`;
const ItemsLeftStyled = styled.span`
  float: left;
  text-align: left;
  color: #777;
  font-size: 14px;
  font-family: "Helvetica Neue", Helvetica, Arial;
`;

const AppContainer = ({
  itemsLeft,
  tasksExist,
  completedTasksExist,
  onDeleteCheckedTasks
}) => (
  <AppContainerStyled>
    <Input />

    <Switch>
      <Route exact path="/" component={TasksList} />
      <Route path="/new" component={TasksList} />
      <Route path="/completed" component={TasksList} />
    </Switch>

    {tasksExist && (
      <NavigationContainer>
        <ItemsLeftStyled>{itemsLeft} items left</ItemsLeftStyled>
        <NavLinksContainer>
          <NavLinkStyled exact to="/">
            All
          </NavLinkStyled>
          <NavLinkStyled to="/new"> New </NavLinkStyled>
          <NavLinkStyled to="/completed"> Completed </NavLinkStyled>
        </NavLinksContainer>
        <ClearCompletedButton
          onClick={onDeleteCheckedTasks}
          completedTasksExist={completedTasksExist}
        >
          Clear Completed
        </ClearCompletedButton>
      </NavigationContainer>
    )}
  </AppContainerStyled>
);

const mapStateToProps = state => {
  const { tasks } = state.tasks;
  const tasksExist = tasks.length > 0;
  const completedTasksExist = tasks.filter(t => t.checked).length > 0;
  const itemsLeft = tasks.filter(t => !t.checked).length;
  return {
    tasksExist: tasksExist,
    completedTasksExist: completedTasksExist,
    itemsLeft: itemsLeft
  };
};

const mapDispatchToProps = dispatch => ({
  onDeleteCheckedTasks: () => dispatch(deleteCheckedTasks()),
  onGetTasks: () => dispatch(getTasks())
});

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.onGetTasks();
    }
  })
)(AppContainer);
