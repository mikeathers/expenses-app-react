import React from "react";

class OdometerForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      origin: "",
      destination: "",
      odometerStart: "",
      odometerEnd: "",
      totalMiles: "",
      totalCost: ""
    };
  }

  updateState = (state, data) => {
    this.setState({ [state]: data }, () => { this.onHandleData(); });
  };

  
  onChange = (e) => {
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
      default:
        return;
    };

  };

  onHandleData = () => {
    this.props.onHandleData({
      origin: this.state.origin,
      destination: this.state.destination,
      odometerStart: this.state.odometerStart,
      odometerEnd: this.state.odometerEnd,
      totalMiles: this.state.totalMiles,
      totalCost: this.state.totalCost
    });
  };

  onBlur = () => {
    const totalMiles = this.state.odometerEnd - this.state.odometerStart;
    const totalCost = totalMiles * this.props.pricePerMile.value;
    this.updateState("totalMiles", totalMiles);
    this.updateState("totalCost", totalCost);
  };

  render() {

    return (
      <div>
        <h2>Odometer</h2>
        <div className="input-group">
          <div>
            <input
              type="text"
              id="origin"
              placeholder="Origin"
              className="text-input"
              onChange={this.onChange}
              value={this.state.origin}
            />

          </div>
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            className="text-input"
            onChange={this.onChange}
            value={this.state.destination}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            id="odometerStart"
            placeholder="Odometer start"
            className="text-input"
            onChange={this.onChange}
            value={this.state.odometerStart}
          />
          <input
            type="number"
            id="odometerEnd"
            placeholder="Odometer end"
            className="text-input"
            onBlur={this.onBlur}
            onChange={this.onChange}
            value={this.state.odometerEnd}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            id="totalMiles"
            placeholder="Total miles"
            className="text-input"
            readOnly="true"
            onChange={this.onChange}
            value={this.state.totalMiles}
          />
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
        </div>
      </div>
    );
  }
}

export default OdometerForm;