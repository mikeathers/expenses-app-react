import React from "react";
import ReactDOM from "react-dom"
import ToggleDisplay from "react-toggle-display";

import OdometerForm from "../Expenses/OdometerForm";
import GoogleMapsForm from "../Expenses/GoogleMapsForm";

class TravelExpenseForm extends React.Component {
  constructor(props) {
    super();

    this.state = ({
      odometerChecked: true,
      googleMapsChecked: false,
    });
  };

  onHandleData = (expenseData) => {   
    this.props.onHandleData({
      origin: expenseData.origin,
      destination: expenseData.destination,
      odometerStart: expenseData.odometerStart,
      odometerEnd: expenseData.odometerEnd,
      totalMiles: expenseData.totalMiles,
      totalCost: expenseData.totalCost
    });
  };

  onPassedInData = () => ({
    createdAt: this.state.createdAt,
    origin: this.state.origin,
    destination: this.state.destination,
    odometerStart: this.state.odometerStart,
    odometerEnd: this.state.odometerEnd,
    totalMiles: this.state.totalMiles,
    totalCost: this.state.totalCost,
  });

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
            className="text-input text-input--mileage"
            ref={(input) => {this.pricePerMile = input}}
          />
        </div>

        <ToggleDisplay show={this.state.odometerChecked}>
          <OdometerForm pricePerMile={this.pricePerMile} onHandleData={this.onHandleData}/>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.googleMapsChecked}>
          <GoogleMapsForm />
        </ToggleDisplay>

      </div>
    );
  };
};

export default TravelExpenseForm;