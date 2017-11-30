import React from "react"
import { connect } from "react-redux"

import ExpenseFormListItem from "./ExpenseFormListItem"

export const ExpenseFormList = (props) => (
  <div className="content-container">
    <h1>Expense Forms:</h1>
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