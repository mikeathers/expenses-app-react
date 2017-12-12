import React from 'react';
import ExpenseFormHeader from "./ExpenseForms/ExpenseFormHeader";
import ExpenseFormList from "./ExpenseForms/ExpenseFormList";

const DashboardPage = () => (
  <div>
    <ExpenseFormHeader />    
    <ExpenseFormList />
  </div>
);

export default DashboardPage;
