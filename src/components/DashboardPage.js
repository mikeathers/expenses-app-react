import React from 'react';
import ExpenseSummary from "./ExpenseSummary";
import ExpenseFormsList from "./ExpenseFormsList";

const DashboardPage = () => (
  <div>
    <ExpenseSummary />
    <ExpenseFormsList />
  </div>
);

export default DashboardPage;
