import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import expenseReducer from "../reducers/expenses";
import expenseFormReducer from "../reducers/expenseForms";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      expenses: expenseReducer,
      expenseForms: expenseFormReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
