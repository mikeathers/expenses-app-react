import React from "react";
import numeral from "numeral";


const ExpenseFormSummary = (props) => (
  <div className="expense-form-summary">
    <h1>{props.name}</h1>
    <p>Total Cost: £{numeral(props.totalCost / 100).format("0,0.00")}</p>    
  </div>
);


export default ExpenseFormSummary;