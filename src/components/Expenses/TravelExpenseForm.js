import React from "react";
import ReactDOM from "react-dom"
import ToggleDisplay from "react-toggle-display";
import { connect } from "react-redux";

import OdometerForm from "../Expenses/OdometerForm";
import GoogleMapsForm from "../Expenses/GoogleMapsForm";

export class TravelExpenseForm extends React.Component {
  constructor(props) {
    super();

    this.state = ({
      odometerChecked: true,
      googleMapsChecked: false,
      origin: props.origin ? props.origin : "",
      destination: props.destination ? props.destination : "",
      odometerStart: props.odometerStart ? props.odometerStart : 0,
      odometerEnd: props.odometerEnd ? props.odometerEnd : 0,
      totalMiles: props.totalMiles ? props.totalMiles : 0,
      totalCost: props.totalCost ? props.totalCost : 0,
    });
  };

  onHandleData = (expenseData) => {   
    this.props.onHandleData({
      description: expenseData.description,
      origin: expenseData.origin,
      destination: expenseData.destination,
      odometerStart: expenseData.odometerStart,
      odometerEnd: expenseData.odometerEnd,
      totalMiles: expenseData.totalMiles,
      totalCost: expenseData.totalCost
    });
  };

  onFormatChange = (e) => {
    if (e.target.value === "odometer") {
      this.setState({
        odometerChecked: !this.state.odometerChecked,
        googleMapsChecked: false
      });
    } else if (e.target.value === "maps") {
      this.setState({
        odometerChecked: false,
        googleMapsChecked: !this.state.googleMapsChecked
      });
    };
  };
  
  pricePerMile = () => (this.pricePerMile);

  render() {
    return (
      <div>

        <div className="input-group">
          <select onChange={this.onFormatChange} className="select">
            <option value="odometer">Odometer</option>
            <option value="maps">Google Maps</option>
          </select>

          <p>Price per mile: </p>
          <input
            type="number"
            defaultValue=".25"
            className="text-input text-input--price-per-mile"
            ref={(input) => {this.pricePerMile = input}}
          />
        </div>

        <ToggleDisplay show={this.state.odometerChecked}>
          <OdometerForm pricePerMile={this.pricePerMile} {...this.state} onHandleData={this.onHandleData}/>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.googleMapsChecked}>
          <GoogleMapsForm />
        </ToggleDisplay>

      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});
export default connect(mapStateToProps)(TravelExpenseForm);