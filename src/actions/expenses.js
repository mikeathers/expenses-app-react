import database from "../firebase/firebase";


// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense
});

export const startAddExpense = (expense = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseForms/${expense.expenseFormId}/expenses`).push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: "EDIT_EXPENSE",
  id, 
  updates
});

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
  type: "REMOVE_EXPENSE",
  id
});

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



