import database from "../firebase/firebase";

// ADD_EXPENSE_FORM
export const addExpenseForm = (expenseForm) => {
  return {
    type: "ADD_EXPENSE_FORM",
    expenseForm
  };
};

export const startAddExpenseForm = (expenseFormData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const { name = "", totalCost = 0, createdAt = 0 } = expenseFormData;
    const expenseForm = { name, totalCost, createdAt };
    return database.ref(`users/${uid}/expenseForms/`).push(expenseForm).then((ref) => {
      dispatch(addExpenseForm({
        id: ref.key,
        ...expenseForm
      }));
    });
  };
};

// EDIT_EXPENSE_FORM
export const editExpenseForm = (id, updates) => {
  return {
    type: "EDIT_EXPENSE_FORM",
    id, 
    updates
  };
};

// REMOVE_EXPENSE_FORM
export const removeExpenseForm = ({id} = {}) => {
  return {
    type: "REMOVE_EXPENSE_FORM",
    id
  };
};

// SET_EXPENSE_FORMS
export const setExpenseForms = (expenseForms) => ({
  type: "SET_EXPENSE_FORMS",
  expenseForms
});

export const startSetExpenseForms = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseForms`).once("value").then((snapshot) => {
      const expenseForms = [];
      snapshot.forEach((childSnapshot) => {
        expenseForms.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenseForms(expenseForms));
    });
  };
};