import React from "react";
import ReactDOM from "react-dom"
import ToggleDisplay from "react-toggle-display";

// On each textbox chnage, state needs to be updated with new value from that textbox
// state needs to be returned as object to props.getChildData

class OdometerForm extends React.Component {
  constructor(props) {
    super();

    this.state = {
      origin: "",
      destination: "",
      odometerStart: "",
      odometerEnd: "",
      totalMiles: "",
      totalCost: "",
      odometerFocused: false
    };

  }

  updateState = (state, data) => {
    this.setState({ [state]: data }, () => {this.onHandleData(); });
  };

  onExit = (e) => {
    
  }
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

const GoogleMapsForm = () => (
  <div>
    <h2>Google Maps</h2>
    <div className="input-group">
      <input
        type="text"
        placeholder="Origin"
        className="text-input"
      />
      <input
        type="text"
        placeholder="Destination"
        className="text-input"
      />
    </div>
    <div className="input-group">
      <input
        type="number"
        placeholder="Total miles"
        className="text-input"
        readOnly="true"
      />
      <input
        type="number"
        placeholder="Total Cost (£)"
        className="text-input"
        readOnly="true"
      />
    </div>
  </div>

);

class TravelExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = ({
      odometerChecked: true,
      googleMapsChecked: false
      
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