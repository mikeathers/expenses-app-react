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

// UPDATE_EXPENSE_FORM_WITH_EXPENSES
export const updateExpenseFormWithExpenses = (id, expenses) => {
  console.log(expenses);
  return {
    type: "UPDATE_EXPENSE_FORM_WITH_EXPENSES",
    id, 
    expenses
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

export const startEditExpenseForm = (id, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseForms/${id}`).update(updates).then((ref) => {
      dispatch(editExpenseForm(id, updates))
    });
  };
};

// REMOVE_EXPENSE_FORM
export const removeExpenseForm = ({ id } = {}) => {
  return {
    type: "REMOVE_EXPENSE_FORM",
    id
  };
};

export const startRemoveExpenseForm = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/expenseForms/${id}`).remove().then(() => {
      dispatch(removeExpenseForm({ id }))
    }).catch((e) => console.log("Remove Failed", e.message));
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