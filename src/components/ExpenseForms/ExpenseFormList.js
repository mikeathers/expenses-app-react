import React from "react";
import { connect } from "react-redux";

import ExpenseFormListItem from "../ExpenseForms/ExpenseFormListItem";


export const ExpenseFormList = (props) => (
    <div className="content-container">
      <div className="list-header">
      <div className="show-for-mobile">Expense Forms</div>
      <div className="show-for-desktop">Expense Form</div>
      <div className="show-for-desktop">Amount</div>
    </div>
    { props.forms.length === 0 ? (
      <div className="list-item list-item--message">
        <span>No expense forms</span>
    </div>
    ) : (
      props.forms.map((form) => {
        return <ExpenseFormListItem key={form.id} {...form} />
      })
    )}
  </div>
);

const mapStateToProps = (state) => ({
  forms: state.expenseForms
});



export default connect(mapStateToProps)(ExpenseFormList);