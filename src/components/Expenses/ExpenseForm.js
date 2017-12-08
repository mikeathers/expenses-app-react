import React from "react";
import ToggleDisplay from "react-toggle-display";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { connect } from "react-redux";

import TravelExpenseForm from "../Expenses/TravelExpenseForm";
import OtherExpenseForm from "../Expenses/OtherExpenseForm";
import ConfirmModal from "../ConfirmModel";
import { startRemoveExpense } from "../../actions/expenses";

export class ExpenseForm extends React.Component {
  constructor(props) {
    super();
    this.state = ({      
      id: props.expense ? props.expense.id : "",
      expenseFormId: props.expense ? props.expense.expenseFormId : "",
      description: props.expense ? props.expense.description : "Travel",
      createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
      origin: props.expense ? props.expense.origin : "",
      destination: props.expense ? props.expense.destination : "",
      odometerStart: props.expense ? props.expense.odometerStart : 0,
      odometerEnd: props.expense ? props.expense.odometerEnd : 0,
      totalMiles: props.expense ? props.expense.totalMiles : 0,
      totalCost: props.expense ? props.expense.totalCost : 0,
      notes: props.expense ? props.expense.notes : "",
      calendarFocused: false,
      editExpense: props.editExpense ? true : false,
      modalIsOpen: false
    });
  };

  componentDidMount() {
    if (this.props.expenseType === "travel") {
      this.setState({ travelSelected: true, otherSelected: false });
    } else {
      this.setState({ travelSelected: false, otherSelected: true })
    }
    if (this.props.editExpense === true) {
      this.setState({ selectDisabled: true })
    }    
    this.props.expenseType ? (
      this.setState({selectedOption: this.props.expenseType})
    ) : (
      this.setState({ selectedOption: "" })
    );
  }
 
 
  onExpenseTypeChange = (e) => {
    if (e.target.value === "travel") {
      this.setState({
        travelSelected: !this.state.travelSelected,
        otherSelected: false
      })
    } else if (e.target.value === "other") {
      this.setState({
        travelSelected: false,
        otherSelected: !this.state.otherSelected
      });        
    }
  };

  // Doesnt allow the date to be deleted. Only updates the state if there is a value in the date picker. 
  // If the state doesnt get updated the value of the datepicker wont change meaning it cant be deleted.
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    };
  }
  // sets calendarFocused to true or false depending on whether the calendar is focused.
  // needed by react-dates component
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit({
      createdAt: this.state.createdAt.valueOf(),
      description: this.state.description,
      origin: this.state.origin,
      destination: this.state.destination,
      odometerStart: this.state.odometerStart,
      odometerEnd: this.state.odometerEnd,
      totalMiles: this.state.totalMiles,
      totalCost: this.state.totalCost,
      notes: this.state.notes,
      type: this.state.description === "Travel" ? "travel" : "other"
    });
  }

  onHandleData = (expenseData) => {
    this.setState({
      description: expenseData.description ? expenseData.description : "",
      origin: expenseData.origin ? expenseData.origin : "",
      destination: expenseData.destination ? expenseData.destination : "",
      odometerStart: expenseData.odometerStart ? expenseData.odometerStart : "",
      odometerEnd: expenseData.odometerEnd ? expenseData.odometerEnd : "",
      totalMiles: expenseData.totalMiles ? expenseData.totalMiles : "",
      totalCost: expenseData.totalCost ? expenseData.totalCost : "",
      notes: expenseData.notes ? expenseData.notes : ""
    });
  };

  onConfirmRemove = (e) => {
    e.preventDefault();
    this.props.onConfirmRemove({
      modalIsOpen: true
    });
  }; 

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>

        
        <div className="input-group">
          <select 
            disabled={this.state.selectDisabled} 
            value={this.state.selectedOption}   
            onChange={this.onExpenseTypeChange} 
            className="select">
              <option value="travel">Travel</option>
              <option value="other">Other</option>          
            </select>
          <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}   
          //displayFormat={() => moment().format("DD/MM/YYYY")}
          />
        </div>

        <ToggleDisplay show={this.state.travelSelected}>
          <TravelExpenseForm {...this.state} onHandleData={this.onHandleData} />
        </ToggleDisplay>

        <ToggleDisplay show={this.state.otherSelected}>
          <OtherExpenseForm {...this.state} onHandleData={this.onHandleData} />
        </ToggleDisplay>

        <div className="input-group">
          <button className="button">Save Expense</button>          
          {this.state.editExpense && <button onClick={this.onConfirmRemove} className="button button--remove">Remove Expense</button>}            
        </div>
      
      
    </form>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: ({id, expenseFormId}) => (dispatch(startRemoveExpense({id, expenseFormId})))
});

export default connect(undefined, mapDispatchToProps)(ExpenseForm);