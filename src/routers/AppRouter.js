import React from 'react';
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import DashboardPage from '../components/DashboardPage';
import AddExpensePage from "../components/Expenses/AddExpensePage";
import EditExpensePage from "../components/Expenses/EditExpensePage";
import ExpenseFormPage from "../components/ExpenseForms/ExpenseFormPage";
import NotFoundPage from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

export const history = createHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={DashboardPage} />
        <PrivateRoute path="/addexpense/:id" component={AddExpensePage} />
        <PrivateRoute path="/editexpense/:expenseFormId/:id" component={EditExpensePage} />
        <PrivateRoute path="/expenseform/:id" component={ExpenseFormPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
);

export default AppRouter;
