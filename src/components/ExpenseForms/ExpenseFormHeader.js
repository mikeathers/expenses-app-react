import React from "react"
import { Link } from "react-router-dom"
import ToggleDisplay from "react-toggle-display"

import AddExpenseForm from "../ExpenseForms/AddExpenseForm";

class ExpenseFormHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      showAddExpenseForm: false
    };
  }
  onShowAddExpenseForm = () => {
    this.setState({
      showAddExpenseForm: !this.state.showAddExpenseForm
    });
  }

  hideAddExpenseForm = (data) => {
    this.setState({
      showAddExpenseForm: data.hide
    });
  }

  
  render() {
    return (
      <div className="page-header">
        <div className="content-container">
        <h1 className="page-header__title">Expense Forms</h1>
          <div className="add-expense-form-container">
            <div className="add-expense-form-left">              
              <button className="button button--add-form" onClick={this.onShowAddExpenseForm}>Add Expense Form</button>    
            </div>
            <div className="add-expense-form-right">
              <ToggleDisplay show={this.state.showAddExpenseForm}>
                <AddExpenseForm hideAddExpenseForm={this.hideAddExpenseForm} />
              </ToggleDisplay>
            </div>
          </div>
        </div>
      </div>
   
    );
  };   
} 

export default ExpenseFormHeader;