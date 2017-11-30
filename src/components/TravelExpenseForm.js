import React from "react";
import ToggleDisplay from "react-toggle-display";

const OdometerForm = () => (
  <div>
    <h2>Odometer</h2>
  </div>
);

const GoogleMapsForm = () => (
  <div>
    <h2>Google Maps</h2>
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

  render() {
    return (
      <div className="input-group__item">
      
          <select onChange={this.onFormatChange} className="select">
            <option value="odometer">Odometer</option>
            <option value="maps">Google Maps</option>
          </select>
          <ToggleDisplay show={this.state.odometerChecked}>
            <OdometerForm />
          </ToggleDisplay>
          <ToggleDisplay show={this.state.googleMapsChecked}>
            <GoogleMapsForm />
          </ToggleDisplay>
      
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
    );
  };
};

export default TravelExpenseForm;