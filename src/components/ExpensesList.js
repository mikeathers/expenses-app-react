import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "./ExpenseListItem";

export const ExpensesList = (props) => (
  <div className="content-container">
    <h1>Expenses:</h1>
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expense forms</span>
        </div>
      ) : (
        props.expenses.map((expense) => {
          return <ExpenseListItem key={expense.id} {...expense}/>
        })
      )}
  </div>
); 

const mapStateToProps = (state) => ({
  expenses: state.expenses
});
export default connect(mapStateToProps)(ExpensesList);