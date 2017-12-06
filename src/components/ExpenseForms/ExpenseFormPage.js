import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import ExpenseFormSummary from "../ExpenseForms/ExpenseFormSummary";
import ExpensesList from "../Expenses/ExpensesList";
import ConfirmModal from "../ConfirmModel";
import { startSetExpenses } from "../../actions/expenses";
import { startRemoveExpenseForm } from "../../actions/expenseForms";

export class ExpenseFormPage extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };
  }
  onLoadExpenses = () => {
    const expenseFormId = this.props.match.params.id;
    this.props.startSetExpenses(expenseFormId);
  }
  onRemove = () => {
    this.props.startRemoveExpenseForm({ id: this.props.expenseForm.id });
    this.props.history.push("/");
  }
  onCloseModal = () => {
    this.setState({ modalIsOpen: false });
  };
  onConfirmRemove = () => {
    this.setState({ modalIsOpen: true });
  };

  componentDidMount() {
    this.onLoadExpenses();
  }

  render() {
    return (
      <div>
        <div className="page-header">
        <div className="content-container"> 
          <ExpenseFormSummary name={this.props.expenseForm.name} totalCost={this.props.expenseForm.totalCost} />
          <Link className="button" to={`/addexpense/${this.props.expenseForm.id}`}>Add new expense </Link>
          <button onClick={this.onConfirmRemove} className="button button--remove">Delete this form</button>   
        </div>
      </div>
      <div className="content-container">
          <ExpensesList />       
      </div>
      <ConfirmModal
        onCloseModal={this.onCloseModal}
        modalIsOpen={this.state.modalIsOpen}
        onRemove={this.onRemove}
        type="Expense Form"
      >
      </ConfirmModal>
    </div>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startSetExpenses: (expenseFormId) => (dispatch(startSetExpenses(expenseFormId))),
  startRemoveExpenseForm: ({id}) => (dispatch(startRemoveExpenseForm({id})))
});

const mapStateToProps = (state, props) => ({
  expenseForm: state.expenseForms.find((form) => form.id === props.match.params.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFormPage);