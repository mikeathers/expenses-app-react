import React from "react";
import { connect } from "react-redux";
import ExpenseListItem from "../Expenses/ExpenseListItem";

export const ExpensesList = (props) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-for-mobile">Expenses</div>
      <div className="show-for-desktop">Expense</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    <div className="list-body">
      {props.expenses.length === 0 ? (
        <div className="list-item list-item--message">
          <span>No expense forms</span>
        </div>
      ) : (
          props.expenses.map((expense) => {
            return <ExpenseListItem key={expense.id} {...expense} />
          })
        )}
    </div>
  </div>
); 

const mapStateToProps = (state) => ({
  expenses: state.expenses
});
export default connect(mapStateToProps)(ExpensesList);