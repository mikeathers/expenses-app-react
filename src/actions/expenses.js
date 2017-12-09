import database from "../firebase/firebase";
import { editExpenseForm, startEditExpenseForm } from "./expenseForms";

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expense = {}) => {
  return (dispatch, getState) => {
    
    const uid = getState().auth.uid;
    const expenseForm = getState().expenseForms.find((form) => form.id === expense.expenseFormId);
    return database.ref(`users/${uid}/expenseForms/${expense.expenseFormId}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));      
      const totalCost = expenseForm.totalCost += expense.totalCost;
      const newExpenseForm = {
        totalCost
      };
     dispatch(startEditExpenseForm(expenseForm.id, newExpenseForm));     
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id, 
  updates
});

export const startEditExpense = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const expense = getState().expenses.find((expense) => expense.id === id);
    const expenseForm = getState().expenseForms.find((form) => form.id === expense.expenseFormId);
    return database.ref(`users/${uid}/expenseForms/${expenseForm.id}/expenses/${id}`).update(updates).then(() => {
      const totalCost = expenseForm.totalCost - expense.totalCost + updates.totalCost;      
      const newExpenseForm = { totalCost };
      dispatch(editExpense(id, updates));
      dispatch(startEditExpenseForm(expenseForm.id, newExpenseForm)); 
    });    
  }
}

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

export const startRemoveExpense = ({id, expenseFormId } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const expenseForm = getState().expenseForms.find((form) => form.id === expenseFormId);
    const expense = getState().expenses.find((expense) => expense.id  === id)
    return database.ref(`users/${uid}/expenseForms/${expenseFormId}/expenses/${id}`).remove().then(() => {
      const totalCost = expenseForm.totalCost - expense.totalCost;
      const newExpenseForm = {
        totalCost
      }
      dispatch(removeExpense({ id }));
      dispatch(startEditExpenseForm(expenseForm.id, newExpenseForm));  
    }).catch((e) => console.log("Error removing the expense from firebse", e.message));
  };
};



// SET_EXPENSE
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses
});

export const startSetExpenses = (expenseFormId) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseForms/${expenseFormId}/expenses`).once("value").then((snapshot) => {
      const expenses = [];
      snapshot.forEach((childSnapShot) => {
        expenses.push({
          id: childSnapShot.key,
          ...childSnapShot.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};



