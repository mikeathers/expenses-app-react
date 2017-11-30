import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export const ExpenseFormPage = (props) => (
  <div className="page-header">
    <div className="content-container">    
     <h2>{props.expenseForm.name}</h2>
     <p>Total Cost: £{props.expenseForm.totalCost}</p>
     <Link className="button" to="/addexpense">Add new expense </Link>
    </div>
  </div>
);
    
const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps)(ExpenseFormPage);