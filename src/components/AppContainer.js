import { Route, Switch, NavLink } from 'react-router-dom';
import React from 'react';
import Input from './Input';
import TasksList from './TasksList';
import * as tasksActions from '../modules/tasks/tasksActions';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { compose, lifecycle } from 'recompose';
import {
  getUncompletedTasks,
  getCompletedTasks,
} from '../modules/tasks/tasksSelectors';

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
  font-family: 'Helvetica Neue', Helvetica, Arial;
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
  font-family: 'Helvetica Neue', Helvetica, Arial;
  border: none;
  background: none;
  cursor: pointer;
  outline: none;
  visibility: ${props => (props.completedTasksExist ? 'visible' : 'hidden')};
  :hover {
    text-decoration: underline;
  }
`;
const ItemsLeftStyled = styled.span`
  float: left;
  text-align: left;
  color: #777;
  font-size: 14px;
  font-family: 'Helvetica Neue', Helvetica, Arial;
`;

const AppContainer = ({
  uncompletedTasksLength,
  tasksExist,
  completedTasksExist,
  onDeleteCheckedTasks,
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
        <ItemsLeftStyled>{uncompletedTasksLength} items left</ItemsLeftStyled>
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
  return {
    tasksExist: state.tasks.tasks.length > 0,
    completedTasksExist: getCompletedTasks(state).length > 0,
    uncompletedTasksLength: getUncompletedTasks(state).length,
  };
};

export default compose(
  connect(
    mapStateToProps,
    {
      onDeleteCheckedTasks: tasksActions.deleteCheckedTasks,
      onGetTasks: tasksActions.getStoredTasksStarted,
    }
  ),
  lifecycle({
    componentDidMount() {
      this.props.onGetTasks();
    },
  })
)(AppContainer);
