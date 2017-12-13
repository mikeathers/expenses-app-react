import React from "react";
import { Link } from "react-router-dom";

const ExpenseFormTitle = (props) => (
  <div>
    <div className="expense-form-summary">
      <h1 className="page-header__form-name">{props.name}</h1>
      
    </div>
  </div>
);

export default ExpenseFormTitle;