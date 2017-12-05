import React from "react";
import numeral from "numeral";


const ExpenseFormSummary = (props) => (
  <div>
    <h1>{props.name}</h1>
    <p>Total Cost: £{numeral(props.totalCost).format("0,000.00")}</p>    
  </div>
);


export default ExpenseFormSummary;