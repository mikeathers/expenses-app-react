import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../ExpenseForms/ExpenseFormSummary";
import ExpenseForm from "../Expenses/ExpenseForm";

class EditExpensePage extends React.Component {
  constructor() {
    super();
  }

  onSubmit = () => {

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
  }
}

const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((expenseForm) => expenseForm.id === props.match.params.expenseFormId ), 
  expense: state.expenses.find((expense) => expense.id === props.match.params.id )
});

export default connect(mapStateToProps)(EditExpensePage);