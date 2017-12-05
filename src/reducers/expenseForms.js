const expenseFormReducerDefaultState = [];

export default (state = expenseFormReducerDefaultState, action) => {
  switch (action.type) {
    
    case "ADD_EXPENSE_FORM": 
      return [
        ...state,
        action.expenseForm
      ];

    case "EDIT_EXPENSE_FORM": 
      return state.map((expenseForm) => {
        if (expenseForm.id === action.id) {
          return {
            ...expenseForm,
            ...action.updates
          };
        } else {
          return expenseForm; 
        }
      });

    case "REMOVE_EXPENSE_FORM": 
      return state.filter(({ id }) => id !== action.id );

    case "SET_EXPENSE_FORMS": 
      return action.expenseForms;
    
    default: 
      return state;
  };

};