import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../ExpenseForms/ExpenseFormSummary";
import ExpenseForm from "../Expenses/ExpenseForm";
import ConfirmModal from "../ConfirmModel";
import { startEditExpense, startRemoveExpense } from "../../actions/expenses";
import { startEditExpenseForm } from "../../actions/expenseForms";

export class EditExpensePage extends React.Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
  };
  onSubmit = (updates) => {
    const id = this.props.expense.id;
    const expense = this.props.expense;
    const expenseForm = this.props.expenseForm;
    const expenseFormId = this.props.expenseForm.id;

    const totalCost = expenseForm.totalCost - expense.totalCost + updates.totalCost;
    const newExpenseForm = {
      ...expenseForm,
      totalCost
    };

    this.props.startEditExpense(id, updates);
    this.props.history.push(`/expenseForm/${expenseFormId}`);
  };

  onRemove = () => {
    const expenseForm = this.props.expenseForm;
    const expense = this.props.expense;

    const totalCost = expenseForm.totalCost - expense.totalCost;
    const newExpenseForm = {
      ...expenseForm,
      totalCost
    }
    this.props.startRemoveExpense({ id: this.props.expense.id, expenseFormId: this.props.expense.expenseFormId });
    this.props.history.push(`/expenseform/${this.props.expenseForm.id}`);
  }

  onConfirmRemove = (data) => {
    this.setState({
      modalIsOpen: data.modalIsOpen
    });
  }

  onCloseModal = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <ExpenseFormSummary name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost}/>
          </div>
        </div>
        <div className="content-container">
          <h2>Edit Expense</h2>
          <ExpenseForm 
            editExpense={true} 
            expense={this.props.expense} 
            onSubmit={this.onSubmit} 
            onConfirmRemove={this.onConfirmRemove}
          />          
        </div>
        <ConfirmModal
          onRemove={this.onRemove}
          onCloseModal={this.onCloseModal}  
          modalIsOpen={this.state.modalIsOpen}
          type="Expense"
        >
      </ConfirmModal>
      </div>
    );
  };
};


const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((expenseForm) => expenseForm.id === props.match.params.expenseFormId ), 
  expense: state.expenses.find((expense) => expense.id === props.match.params.id )
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startEditExpenseForm: (id, updates) => dispatch(startEditExpenseForm(id, updates)),
  startRemoveExpense: ({id, expenseFormId}) => dispatch(startRemoveExpense({id, expenseFormId})) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);