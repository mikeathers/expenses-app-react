import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import uuid from "uuid";

import { addExpenseForm } from "../actions/expenseForms";


class AddExpenseForm extends React.Component {
  constructor() {
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

 onAddForm = () => {

  const expenseForm = {
    id: uuid(),
    name: this.state.formName,
    createdAt: moment(),
    totalCost: 0
  };

   this.props.addExpenseForm(expenseForm)
 };

  render() {
    return (
      <div>      
        <input onChange={this.onTextChange} type="text" placeholder="Expense form name" />
        <button onClick={this.onAddForm}>Add</button>
      </div>
    );
  } 
  
};

const mapStateToProps = (state) => ({
  expenseForms: state.expenseForms
})

const mapDispatchToProps = (dispatch) => ({
  addExpenseForm: (expenseForm) => dispatch(addExpenseForm(expenseForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);