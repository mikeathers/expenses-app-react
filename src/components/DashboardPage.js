import React from 'react';
import ExpenseFormHeader from "./ExpenseForms/ExpenseFormHeader";
import ExpenseFormList from "./ExpenseForms/ExpenseFormList";
import ExpenseListFilters from "./ExpenseForms/ExpenseListFilter";
const DashboardPage = () => (
  <div>
    <ExpenseFormHeader />
    <ExpenseListFilters />
    <ExpenseFormList />
  </div>
);

export default DashboardPage;
