
// ADD_EXPENSE_FORM
export const addExpenseForm = (expenseForm) => {
  return {
    type: "ADD_EXPENSE_FORM",
    expenseForm
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