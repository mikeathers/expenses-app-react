import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import uuid from "uuid";

import { startAddExpenseForm } from "../../actions/expenseForms";


class AddExpenseForm extends React.Component {
  constructor(props) {
    super();

    this.state ={ 
      formName: ""
    };
  }

 onTextChange = (e) => {
  this.setState({
    formName: e.target.value
  });  
 };

 onSubmit = (e) => {
   e.preventDefault();
  const now = moment();
  const expenseForm = {
    id: uuid(),
    name: this.state.formName,
    createdAt: now.valueOf(),
    totalCost: 0,
    note: ""
  };

   this.props.startAddExpenseForm(expenseForm);
   this.setState({ formName: "" })
   this.hideAddExpenseForm();
 }; 

 hideAddExpenseForm = () => {
  this.props.hideAddExpenseForm({
    hide: false
  });
 }

  render() {
    return (
      <form onSubmit={this.onSubmit} className="add-expense-form">      
        <input 
          className="add-expense-form__input"
          onChange={this.onTextChange} 
          value={this.state.formName}
          type="text" 
          placeholder="Expense form name"
        />       
        <button className="add-expense-form__button">Add</button>
      </form>
    );
  } 
  
};

const mapStateToProps = (state) => ({
  expenseForms: state.expenseForms
})

const mapDispatchToProps = (dispatch) => ({
  startAddExpenseForm: (expenseForm) => dispatch(startAddExpenseForm(expenseForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);