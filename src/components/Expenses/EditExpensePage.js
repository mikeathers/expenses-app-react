import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormTitle from "../ExpenseForms/ExpenseFormTitle";
import ExpenseForm from "../Expenses/ExpenseForm";
import ConfirmModal from "../ConfirmModel";
import { startEditExpense, startRemoveExpense } from "../../actions/expenses";
import { startEditExpenseForm } from "../../actions/expenseForms";

export class EditExpensePage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      modalIsOpen: false,
      type: props.expense ? props.expense.type : ""
    };
  };
  onSubmit = (updates) => {
    const id = this.props.expense.id;
    const expenseFormId = this.props.expenseForm.id;    
    this.props.startEditExpense(id, updates);
    this.props.history.push(`/expenseForm/${expenseFormId}`);
  };

  onRemove = () => {
    const id = this.props.expense.id;
    const expenseFormId = this.props.expenseForm.id;
    this.props.startRemoveExpense({ id, expenseFormId });
    this.props.history.push(`/expenseform/${expenseFormId}`);
  }

  onConfirmRemove = (data) => {
    this.setState({
      modalIsOpen: data.modalIsOpen
    });
  }

  onCloseModal = () => {
    this.setState({ modalIsOpen: false });
  }

  //travelSelected = () => { this.props.expense.description === "travel" ? true : false; }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <ExpenseFormTitle name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost}/>
          </div>
        </div>
        <div className="content-container">
          <h2>Edit Expense</h2>
          <ExpenseForm 
            editExpense={true} 
            expense={this.props.expense} 
            onSubmit={this.onSubmit} 
            onConfirmRemove={this.onConfirmRemove}
            expenseType={this.state.type}
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
  expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch) => ({
  startEditExpense: (id, updates) => dispatch(startEditExpense(id, updates)),
  startEditExpenseForm: (id, updates) => dispatch(startEditExpenseForm(id, updates)),
  startRemoveExpense: ({id, expenseFormId}) => dispatch(startRemoveExpense({id, expenseFormId})) 
});

export default connect(mapStateToProps, mapDispatchToProps)(EditExpensePage);