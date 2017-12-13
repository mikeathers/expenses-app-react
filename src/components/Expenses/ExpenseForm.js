import React from "react";
import ToggleDisplay from "react-toggle-display";
import { SingleDatePicker } from "react-dates";
import moment from "moment";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
      mileageType: props.expense ? props.expense.mileageType : "odometer",
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
      modalIsOpen: false,
      error: "",
      expenseType: props.expenseType ? props.expenseType : "",
      pricePerMile: props.expense ? props.expense.pricePerMile : .25
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
    if (this.props.expense) {
      this.setState({ selectedOption: this.props.expenseType })
    }
  }

 
  onExpenseTypeChange = (e) => {
    if (e.target.value === "travel") {
      this.setState({
        travelSelected: !this.state.travelSelected,
        otherSelected: false,
        expenseType: "travel"
      });

    } else if (e.target.value === "other") {
      this.setState({
        travelSelected: false,
        otherSelected: !this.state.otherSelected,
        expenseType: "other"
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

   
    if (this.state.expenseType === "other") {      
      if (this.state.description === "" || this.state.totalCost === "") {
        this.setState({ error: "Description and amount are needed before you can submit this form."});
        return;
      }
    }
    else if (this.state.expenseType === "travel") {
      if (this.state.origin === "" || this.state.destination === "") {
        this.setState({ error: "Origin and Destination need to be filled in before you can submit the form."});
        return;
      }
      else if (this.state.mileageType === "odometer") {
        if (this.state.odometerStart === "" || this.state.odometerEnd === "") {
          this.setState({ error: "Odometer start and end values are required before you can submit the form."});
          return;
        }
      } 
    }
    this.props.onSubmit({
      createdAt: this.state.createdAt.valueOf(),
      description: this.state.description,
      mileageType: this.state.mileageType,
      origin: this.state.origin,
      destination: this.state.destination,
      odometerStart: this.state.odometerStart,
      odometerEnd: this.state.odometerEnd,
      totalMiles: this.state.totalMiles,
      totalCost: this.state.totalCost,
      notes: this.state.notes,
      type: this.state.description === "Travel" ? "travel" : "other",
      pricePerMile: this.state.pricePerMile
    });
   
  }   
 

  onHandleData = (expenseData) => {
    this.setState({
      description: expenseData.description ? expenseData.description : "",
      mileageType: expenseData.mileageType ? expenseData.mileageType : "",
      origin: expenseData.origin ? expenseData.origin : "",
      destination: expenseData.destination ? expenseData.destination : "",
      odometerStart: expenseData.odometerStart ? expenseData.odometerStart : "",
      odometerEnd: expenseData.odometerEnd ? expenseData.odometerEnd : "",
      totalMiles: expenseData.totalMiles ? expenseData.totalMiles : "",
      totalCost: expenseData.totalCost ? expenseData.totalCost : "",
      notes: expenseData.notes ? expenseData.notes : "",
      pricePerMile: expenseData.pricePerMile ? expenseData.pricePerMile : "",
      error: expenseData.error ? expenseData.error : ""
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
            className="select text-input__date">
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
          <TravelExpenseForm 
            editExpense={this.state.editExpense} 
            mileageType={this.state.mileageType} 
            {...this.state} 
            onHandleData={this.onHandleData} 
          />
        </ToggleDisplay>

        <ToggleDisplay show={this.state.otherSelected}>
          <OtherExpenseForm {...this.state} onHandleData={this.onHandleData} />
        </ToggleDisplay>

        {this.state.error && <p className="form__error">{this.state.error}</p>}

        <div className="input-group">
          <button className="button">Save Expense</button>          
          {this.state.editExpense && <button onClick={this.onConfirmRemove} className="button button--remove">Remove Expense</button>}   
          {!this.state.editExpense && <Link className="button button--secondary" to={`/expenseform/${this.props.expenseFormId}`}>Cancel</Link>}         
        </div>
      
      
    </form>
    );
  };
};

const mapDispatchToProps = (dispatch) => ({
  startRemoveExpense: ({id, expenseFormId}) => (dispatch(startRemoveExpense({id, expenseFormId})))
});

export default connect(undefined, mapDispatchToProps)(ExpenseForm);