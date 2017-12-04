import React from 'react';
import ExpenseFormsHeader from "./ExpenseForms/ExpenseFormsHeader";
import ExpenseFormsList from "./ExpenseForms/ExpenseFormsList";

const DashboardPage = () => (
  <div>
    <ExpenseFormsHeader />
    <ExpenseFormsList />
  </div>
);

export default DashboardPage;
