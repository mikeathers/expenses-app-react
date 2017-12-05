import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../ExpenseForms/ExpenseFormSummary";
import ExpenseForm from "../Expenses/ExpenseForm";
import { startEditExpense } from "../../actions/expenses";
import { startEditExpenseForm } from "../../actions/expenseForms";

export class EditExpensePage extends React.Component {

  onSubmit = (updates) => {
    const id = this.props.expense.id;
    const expense = this.props.expense;
    const expenseForm = this.props.expenseForm;
    const expenseFormId = this.props.expenseForm.id;

    const totalCost = expenseForm.totalCost - expense.totalCost + updates.totalCost;
    const newExpenseForm = {
      ...expenseForm,
      totalCost
    };

    this.props.startEditExpense(id, updates);
    this.props.startEditExpenseForm(expenseFormId, newExpenseForm);
    this.props.history.push(`/expenseForm/${expenseFormId}`);
  };

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <ExpenseFormSummary name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost}/>
            <Link className="button" to={`/expenseForm/${this.props.expenseForm.id}`}>Back</Link>
          </div>
        </div>
        <div className="content-container">
          <h2>Edit Expense</h2>
          <ExpenseForm expense={this.props.expense} onSubmit={this.onSubmit} />          
        </div>
      </div>
    );
  };
};


const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((expenseForm) => expenseForm.id === props.match.params.expenseFormId ), 
  expense: state.expenses.find((expense) => expense.id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startEditExpenseForm: (id, updates) => dispatch(startEditExpenseForm(id, updates)) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);