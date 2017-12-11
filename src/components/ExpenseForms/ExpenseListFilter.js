import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTextFilter, sortByAmount, sortByDate, setStartDate, setEndDate } from "../../actions/filters";

export class ExpenseListFilter extends React.Component {
  constructor() {
    super();
    this.state = {
      calendarFocused: null
    };
  };
  onChange = (e) => {
    const id = e.target.id;
    const data = e.target.value;
    switch (id) {
      case "textFilter": 
        return this.props.setTextFilter(data);      
      case "datePicker": 
        return;
      default: 
        return;
    }
  };

  onSortChange = (e) => {console.log(e.target);
      if (e.target.value === "date") { console.log("date");this.props.sortByDate(); }
      else if (e.target.value === "amount") { this.props.sortByAmount(); }
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.props.setStartDate(startDate);
    this.props.setEndDate(endDate);
  };

  onFocusChange = (calendarFocused) => {
    this.setState({ calendarFocused });
  };

  render() {
    return (
      <div className="content-container">
        <div className="input-group">
          <input 
            id="textFilter" 
            className="text-input" 
            placeholder="Search expenses" 
            type="text" 
            onChange={this.onChange} 
            value={this.props.filters.textFilter}
          />
          <select
            id="sortByPicker"
            className="select"
            //value={this.props.filters.sortBy}
            onChange={this.onSortChange}
          >
            <option id="date">Date</option>
            <option id="amount" >Amount</option>
          </select>
          <DateRangePicker 
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
        </div>
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  SortByAmount: () => dispatch(sortByAmount),
  sortByDate: () => dispatch(sortByDate),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter)