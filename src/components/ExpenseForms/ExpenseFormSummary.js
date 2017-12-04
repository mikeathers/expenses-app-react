import React from "react";


const ExpenseFormSummary = (props) => (
  <div>
    <h1>{props.name}</h1>
    <p>Total Cost: £{props.totalCost}</p>    
  </div>
);


export default ExpenseFormSummary;