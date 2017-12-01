import React from "react";
import ToggleDisplay from "react-toggle-display";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

import TravelExpenseForm from "./TravelExpenseForm";
import OtherExpenseForm from "./OtherExpenseForm";

class ExpenseForm extends React.Component {
  constructor() {
    super();
    this.state = ({
      travelSelected: true,
      otherSelected: false,
      createdAt: moment(),
      origin: "",
      destination: "",
      odometerStart: 0,
      odometerEnd: 0,
      totalMiles: 0,
      totalCost: 0,
      calendarFocused: false,
    });
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
      date: this.state.createdAt.valueOf(),
      description: "Travel",
      origin: this.state.origin,
      destination: this.state.destination,
      odometerStart: this.state.odometerStart,
      odometerEnd: this.state.odometerEnd,
      totalMiles: this.state.totalMiles,
      totalCost: this.state.totalCost
    });
  }

  onHandleData = (expenseData) => {
    this.setState({
      origin: expenseData.origin,
      destination: expenseData.destination,
      odometerStart: expenseData.odometerStart,
      odometerEnd: expenseData.odometerEnd,
      totalMiles: expenseData.totalMiles,
      totalCost: expenseData.totalCost
    });
  };

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>

        <h2>New Expense</h2>
        <div className="input-group">
        <select onChange={this.onExpenseTypeChange} className="select">
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
          

          <div className="input-group" >
            
          </div>
          <ToggleDisplay show={this.state.travelSelected}>
            <TravelExpenseForm onHandleData={this.onHandleData} />
          </ToggleDisplay>

          <ToggleDisplay show={this.state.otherSelected}>
            <OtherExpenseForm />
          </ToggleDisplay>

          <div className="input-group">
            <button className="button">Save Expense</button>
          </div>
          

    </form>
    );
  };
};

export default ExpenseForm;