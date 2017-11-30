import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import uuid from "uuid";

import { startAddExpenseForm } from "../actions/expenseForms";


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
  const now = moment();
  const expenseForm = {
    id: uuid(),
    name: this.state.formName,
    createdAt: now.valueOf(),
    totalCost: 0,
    note: ""
  };

   this.props.startAddExpenseForm(expenseForm)
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
  startAddExpenseForm: (expenseForm) => dispatch(startAddExpenseForm(expenseForm))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddExpenseForm);