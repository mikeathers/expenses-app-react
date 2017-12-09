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
      origin: props.origin ? props.origin : "",
      destination: props.destination ? props.destination : "",
      odometerStart: props.odometerStart ? props.odometerStart : 0,
      odometerEnd: props.odometerEnd ? props.odometerEnd : 0,
      totalMiles: props.totalMiles ? props.totalMiles : 0,
      totalCost: props.totalCost ? props.totalCost : 0,
    });
  };

  componentDidMount() {
    if (this.props.mileageType === "odometer") {      
      this.setState({ showOdometer: true, showGoogleMaps: false });
    } else {
      this.setState({ showOdometer: false, showGoogleMaps: true });
    }
    if (this.props.editExpense === true) {
      this.setState({ selectDisabled: true })
    }
  };
  

  onHandleData = (expenseData) => {   
    this.props.onHandleData({
      description: expenseData.description,
      mileageType: expenseData.mileageType,
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
        showOdometer: !this.state.showOdometer,
        showGoogleMaps: false
      });
    } else if (e.target.value === "maps") {
      this.setState({
        showOdometer: false,
        showGoogleMaps: !this.state.showGoogleMaps
      });
    };
  };
  
  pricePerMile = () => (this.pricePerMile);

  render() {
    return (
      <div>

        <div className="input-group">
          <select onChange={this.onFormatChange} disabled={this.state.selectDisabled} className="select">
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

        <ToggleDisplay show={this.state.showOdometer}>
          <OdometerForm pricePerMile={this.pricePerMile} {...this.state} onHandleData={this.onHandleData}/>
        </ToggleDisplay>
        <ToggleDisplay show={this.state.showGoogleMaps}>
          <GoogleMapsForm pricePerMile={this.pricePerMile} {...this.state} onHandleData={this.onHandleData} />
        </ToggleDisplay>

      </div>
    );
  };
};

const mapStateToProps = (state, props) => ({
  //expense: state.expenses.find((expense) => expense.id === props.match.params.id)
});
export default connect(mapStateToProps)(TravelExpenseForm);