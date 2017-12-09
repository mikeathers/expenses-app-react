import React from "react";

class GoogleMapsForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      origin: props.origin ? props.origin : "",
      destination: props.destination ? props.destination : "",
      totalMiles: props.totalMiles ? props.totalMiles : "",
      totalCost: props.totalCost ? (props.totalCost / 100).toString() : ""
    }
  }

  updateState = (state, data) => {
    this.setState({ [state]: data }, () => { this.onHandleData() });
  }

  onChange = (e) => {
    const id = e.target.id;
    const data = e.target.value;

    switch (id) {
      case "origin":
        return this.updateState("origin", data);
      case "destination": 
        return this.updateState("destination", data);
      case "totalMiles": 
        return this.updateState("totalMiles", data);
      case "totalCost":
        return this.updateState("totalCost", data);
      default: 
        return;
    }
  }
  onHandleData = () => {
    this.props.onHandleData({
      description: "Travel",
      mileageType: "googleMaps",
      origin: this.state.origin,
      destination: this.state.destination,
      totalMiles: this.state.totalMiles,
      totalCost: parseFloat(this.state.totalCost, 10) * 100
    });
  };

  render() {
    return (

      <div>
        <h2>Google Maps</h2>
        <div className="input-group">
          <input
            type="text"
            id="origin"
            placeholder="Origin"
            className="text-input"
            value={this.state.origin}
            onChange={this.onChange}
          />
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            className="text-input"
            value={this.state.destination}
            onChange={this.onChange}
          />
        </div>
        <div className="input-group">
          <input
            type="number"
            id="totalMiles"
            placeholder="Total miles"
            className="text-input"
            value={this.state.totalMiles}
            onChange={this.onChange}
          />
          <input
            type="number"
            id="totalCost"
            placeholder="Total Cost (£)"
            className="text-input"
            value={this.state.totalCost}
            onChange={this.onChange}
          />
        </div>
      </div>

    );
  }
}

export default GoogleMapsForm;