import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../components/ExpenseFormSummary";

export const ExpenseFormPage = (props) => (
  <div className="page-header">
    <div className="content-container"> 
      <ExpenseFormSummary name={props.expenseForm.name} totalCost={props.expenseForm.totalCost} />
      <Link className="button" to={`/addexpense/${props.expenseForm.id}`}>Add new expense </Link>
      <button className="button button--delete">Delete this form</button>   
    </div>
  </div>
);
    
const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps)(ExpenseFormPage);