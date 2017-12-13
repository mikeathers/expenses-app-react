import React from "react";
import numeral from "numeral";
import { connect } from "react-redux";

import selectExpenses from "../../selectors/expenses";
import getExpensesTotal from "../../selectors/expenses-total";

export const ExpenseFormSummary = ({ expensesCount, expensesTotal, overallExpenses, overallCost, ...props }) => {
  const expenseWord = expensesCount === 1 ? "expense" : "expenses";
  const formattedExpenseTotal = numeral(expensesTotal / 100).format("0,000.00");
  const formattedOverallCost = numeral(overallCost / 100).format("0,000.00");
  console.log(expensesTotal);
  return (
  <div className="expense-form-summary">
    <h1 className="page-header__form-name">{props.name}</h1>
    <h2 className="page-header__title">Viewing <span>{expensesCount}</span> {expenseWord } totalling <span>£{formattedExpenseTotal}</span></h2>
    <p><u>Overall Expenses:</u> {overallExpenses}</p>
    <p><u>Total Cost:</u> £{numeral(props.totalCost / 100).format("0,0.00")}</p>    
  </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters);
  
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses),
    overallExpenses: state.expenses.length,
    overallCost: getExpensesTotal(state.expenses)
  };
};

export default connect(mapStateToProps)(ExpenseFormSummary);