import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import numeral from "numeral";

const ExpenseListItem = ({ id, description, totalCost, date }) => (
  <Link className="list-item" to="">
  <h3>{description}</h3>
  </Link>
);

export default ExpenseListItem;
