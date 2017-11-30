import React from "react";
import ToggleDisplay from "react-toggle-display";

import TravelExpenseForm from "./TravelExpenseForm";
import OtherExpenseForm from "./OtherExpenseForm";

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = ({
      travelSelected: true,
      otherSelected: false
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
  }
  render() {
    return (
      <form className="form">
        <h2>New Expense</h2>
          <select onChange={this.onExpenseTypeChange} className="select">
            <option value="travel">Travel</option>
            <option value="other">Other</option>
          
          </select>

          <ToggleDisplay show={this.state.travelSelected}>
            <TravelExpenseForm />
          </ToggleDisplay>

          <ToggleDisplay show={this.state.otherSelected}>
            <OtherExpenseForm />
          </ToggleDisplay>
    </form>
    )
  }
}

export default ExpenseForm;