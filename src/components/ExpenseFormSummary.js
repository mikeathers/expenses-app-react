import React from "react";


const ExpenseFormSummary = (props) => (
  <div>
    <h2>{props.name}</h2>
    <p>Total Cost: £{props.totalCost}</p>    
  </div>
);


export default ExpenseFormSummary;