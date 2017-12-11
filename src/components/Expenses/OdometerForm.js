import React from "react";
import numeral from "numeral";

class OdometerForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      origin: props.origin ? props.origin : "",
      destination: props.destination ? props.destination : "",
      odometerStart: props.odometerStart ? props.odometerStart : "",
      odometerEnd: props.odometerEnd ? props.odometerEnd : "",
      totalMiles: props.totalMiles ? props.totalMiles : "",
      totalCost: props.totalCost ? (props.totalCost / 100).toString() : "" ,
      error: ""
    };
  }

  updateState = (state, data) => {
    this.setState({ [state]: data }, () => { this.onHandleData(); });
  };

  odometerStart = () => this.odometerStart;

  onChange = (e) => {
    this.setState({ error: "" });
    const data = e.target.value;
    const id = e.target.id;

    switch (id) {
      case "origin":
        return this.updateState("origin", data);
      case "destination":
        return this.updateState("destination", data);
      case "odometerStart":
        return this.updateState("odometerStart", data);
      case "odometerEnd":
        return this.updateState("odometerEnd", data);  
     break;
      default:
        return;
    };

  };

  onHandleData = () => {
    this.props.onHandleData({
      description: "Travel",
      mileageType: "odometer",
      origin: this.state.origin,
      destination: this.state.destination,
      odometerStart: this.state.odometerStart,
      odometerEnd: this.state.odometerEnd,
      totalMiles: this.state.totalMiles,
      totalCost: parseFloat(this.state.totalCost, 10) * 100,
      error: this.state.error
    });
  };

  onBlur = (e) => {
    if (e.target.value === "") {
      return;
    }

    if (e.target.value <= this.odometerStart.value) {
      this.updateState("error", "Odometer End value must be greater than start value.");
      return;
    } 

    const totalMiles = this.state.odometerEnd - this.state.odometerStart;
    const totalCost =  totalMiles * this.props.pricePerMile.value; 
    this.updateState("totalMiles", totalMiles);
    this.updateState("totalCost", totalCost);

    
  };

  render() {

    return (
      <div>
        <h2>Odometer</h2>
        <div className="input-group">
          <label>Origin:
            <input
              type="text"
              id="origin"
              placeholder="Enter Origin"
              className="text-input"
              onChange={this.onChange}
              value={this.state.origin}
            />
          </label>
          <label>Destination:
          <input
            type="text"
            id="destination"
            placeholder="Enter Destination"
            className="text-input"
            onChange={this.onChange}
            value={this.state.destination}
          />
          </label>
        </div>
       
        <div className="input-group">
        <label>Odometer Start:
          <input
            type="number"
            id="odometerStart"
            placeholder="Odometer Start"
            className="text-input"
            onChange={this.onChange}
            value={this.state.odometerStart}
            ref={(input) => { this.odometerStart = input }}
          />
          </label>
          <label>Odometer End:
          <input
            type="number"
            id="odometerEnd"
            placeholder="Odometer End"
            className="text-input"
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.odometerEnd}
          />
          </label>
        </div>
        <div className="input-group">
        <label>Total Miles:
          <input
            type="number"
            id="totalMiles"
            placeholder="Total Miles"
            className="text-input"
            readOnly="true"
            onChange={this.onChange}
            value={this.state.totalMiles}
          />
          </label>
          <label>Total Cost:
          <input
            type="number"
            id="totalCost"
            name="totalCost"
            placeholder="Total Cost (£)"
            className="text-input"
            readOnly="true"
            onChange={this.onChange}
            value={this.state.totalCost}
          />
          </label>
        </div>
      </div>
    );
  }
}

export default OdometerForm;