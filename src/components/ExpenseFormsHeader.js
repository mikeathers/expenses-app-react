import React from "react"
import { Link } from "react-router-dom"
import ToggleDisplay from "react-toggle-display"

import AddExpenseForm from "./AddExpenseForm";

class ExpenseFormsSummary extends React.Component {
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

  
  render() {
    return (
      <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">Expense Forms</h1>
        <button className="button" onClick={this.onShowAddExpenseForm}>Add Expense Form</button>
        <ToggleDisplay show={this.state.showAddExpenseForm}>
          <AddExpenseForm />
        </ToggleDisplay>
      </div>
    </div>
    );
  };   
} 

export default ExpenseFormsSummary;