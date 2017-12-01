import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, totalCost, date, createdAt }) => (
  <Link className="list-item" to="">
    <div>
      <h3 className="list-item__title">{description}</h3>
      <span className="list-item__sub-title">{moment(createdAt).format("MMMM Do, YYYY")}</span>
    </div>
    <h3 className="list-item__data">{"£" + numeral(totalCost).format("0,0.00")}</h3>
  </Link>
  
);

export default ExpenseListItem;
