import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "./ExpenseFormSummary";
import ExpenseList from "./ExpensesList";
import { startSetExpenses } from "../actions/expenses";

export class ExpenseFormPage extends React.Component {
  onLoadExpenses = () => {
    const expenseFormId = this.props.match.params.id;
    this.props.startSetExpenses(expenseFormId);
  }
  render() {
    {this.onLoadExpenses()};
    return (
      <div>
        <div className="page-header">
        <div className="content-container"> 
          <ExpenseFormSummary name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost} />
          <Link className="button" to={`/addexpense/${this.props.expenseForm.id}`}>Add new expense </Link>
          <button className="button button--delete">Delete this form</button>   
        </div>
      </div>
      <div className="content-container">
        <ExpenseList />
      </div>
    </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startSetExpenses: (expenseFormId) => (dispatch(startSetExpenses(expenseFormId)))
});

const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormPage);