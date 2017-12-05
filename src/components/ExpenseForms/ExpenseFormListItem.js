import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";

const ExpenseFormListItem = ({ id, name, totalCost }) => (
  <Link className="list-item" to={`/expenseform/${id}`}>
    <div>
      <h2 className="list-item__title">{name}</h2>
    </div>
    <div>
      <h2 className="list-item__data">£{numeral(totalCost).format("0,000.00")}</h2>
    </div>
  </Link>
);

export default ExpenseFormListItem;