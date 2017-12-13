import React from "react";
import { connect } from "react-redux";
import { DateRangePicker } from "react-dates";
import { setTextFilter, setSortBy, setStartDate, setEndDate } from "../../actions/filters";

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
      default: 
        return;
    }
  };

  onSortChange = (e) => {
      const value = e.target.value;
      if (value == "Date") {
        this.props.setSortBy("date")
      } else if (value == "Amount") {
      this.props.setSortBy("amount");
    }      
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
          <div className="input-group__item">
            <input
              id="textFilter"
              className="text-input text-input__filters"
              placeholder="Search expenses"
              type="text"
              onChange={this.onChange}
              value={this.props.filters.textFilter}
            />
          </div>
          <div className="input-group__item">
            <select
              id="sortByPicker"
              className="select text-input__filters"
              onChange={this.onSortChange}
            >
              <option id="date">Date</option>
              <option id="amount" >Amount</option>
            </select>
          </div>
          <div className="input-group__item">
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
      </div>
    );
  };
}

const mapDispatchToProps = (dispatch) => ({
  setTextFilter: (text) => dispatch(setTextFilter(text)),
  setSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate))
});

const mapStateToProps = (state) => ({
  filters: state.filters
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilter)