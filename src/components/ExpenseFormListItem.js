import React from "react";
import { Link } from "react-router-dom";

const ExpenseFormListItem = ({ id, name, totalCost }) => (
  <Link className="list-item" to={`/expenseform/${id}`}>
    <div>
      <h2 className="list-item__title">{name}</h2>
    </div>
    <div>
      <h2 className="list-item__data">£{totalCost}</h2>
    </div>
  </Link>
);

export default ExpenseFormListItem;