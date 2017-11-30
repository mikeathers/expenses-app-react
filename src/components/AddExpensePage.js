import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "./ExpenseFormSummary";
import ExpenseForm from "./ExpenseForm";

export const AddExpensePage = (props) => (
  <div>
    <div className="page-header">
      <div className="content-container">
        <ExpenseFormSummary name={props.expenseForm.name} totalCost={props.expenseForm.totalCost}/>
        <Link className="button" to={`/expenseForm/${props.expenseForm.id}`}>Back</Link>
      </div>
    </div>
    <div className="content-container">
      <ExpenseForm />
    </div>
  </div>
);


const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps)(AddExpensePage);