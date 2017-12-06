import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../ExpenseForms/ExpenseFormSummary";
import ExpenseForm from "../Expenses/ExpenseForm";
import { startAddExpense, startEditExpense } from "../../actions/expenses";
import { startEditExpenseForm } from "../../actions/expenseForms";
 
class AddExpensePage extends React.Component {

  onSubmit = (expenseData) => {
    const expenseForm = this.props.expenseForm;
    const expenseFormId = expenseForm.id;    
    const expense = {
      expenseFormId,
      ...expenseData
    }
    const totalCost = expenseForm.totalCost += expense.totalCost;
    const newExpenseForm = {
      ...expenseForm,
      totalCost
    };
    
    this.props.startAddExpense(expense);
    this.props.startEditExpenseForm(expenseFormId, newExpenseForm);
    this.props.history.push(`/expenseForm/${this.props.match.params.id}`);
  }
  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <ExpenseFormSummary name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost}/>
          </div>
        </div>
        <div className="content-container">
          <h2>New Expense</h2>
          <ExpenseForm editExpense={false} onSubmit={this.onSubmit} />          
        </div>
      </div>
    );
  };
};


const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense)),
  startEditExpenseForm: (id, updates) => dispatch(startEditExpenseForm(id, updates))
});

const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);