import React from "react";
import { Link } from "react-router-dom";
import numeral from "numeral";
import moment from "moment";

const ExpenseFormListItem = ({ id, name, totalCost, createdAt }) => (
  <Link className="list-item" to={`/expenseform/${id}`}>
    <div>
      <h2 className="list-item__title">{name}</h2>
      <span className="list-item__sub-title">Created: {moment(createdAt).format("MMMM Do, YYYY")}</span>
    </div>
    <div>
      <h2 className="list-item__data">£{numeral(totalCost / 100).format("0,0.00")}</h2>
    </div>
  </Link>
);

export default ExpenseFormListItem;