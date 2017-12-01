import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "./ExpenseFormSummary";
import ExpenseForm from "./ExpenseForm";
import { startAddExpense } from "../actions/expenses";

class AddExpensePage extends React.Component {

  onSubmit = (expenseData) => {
    const expense = {
      expenseFormId: this.props.match.params.id,
      ...expenseData
    }
    this.props.startAddExpense(expense);
    this.props.history.push(`/expenseForm/${this.props.match.params.id}`);
  }
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
          <ExpenseForm onSubmit={this.onSubmit} />          
        </div>
      </div>
    );
  };
};


const mapDispatchToProps = (dispatch) => ({
  startAddExpense: (expense) => dispatch(startAddExpense(expense))
});

const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpensePage);