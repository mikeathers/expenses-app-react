import React from "react";

import updateState from "../../utility/updateState";

class GoogleMapsForm extends React.Component {
  constructor(props) {
    super();
    this.state = {
      origin: props.origin ? props.origin : "",
      destination: props.destination ? props.destination : "",
      totalMiles: props.totalMiles ? props.totalMiles : "",
      totalCost: props.totalCost ? (props.totalCost / 100).toString() : "",
      error: ""
    };
  };

  googleMapsOrigin = () => this.googleMapsOrigin;
  googleMapsDestination = () => this.googleMapsDestination;
  
  updateState = (state, data) => {
    return new Promise(
      (resolve, reject) => { resolve(this.setState({ [state]: data }, () => { this.onHandleData() })); }
    );    
  }; 

  placesEventListener = (searchbox, state) => {     
    google.maps.event.addDomListener(searchbox, "keydown", (e) => {
      if (e.keyCode === 13) { e.preventDefault(); }
    });
  };

  onSetOrigin = () => {
    this.updateState("origin", this.googleMapsOrigin.value);    
  };

  onSetDestination = () => {  
    this.updateState("destination", this.googleMapsDestination.value).then(() => {
      this.calculateDistance(this.state.origin, this.state.destination);
    });
  };

  componentDidMount() {
    this.placesEventListener(this.googleMapsOrigin);
    this.placesEventListener(this.googleMapsDestination);
  };

  onChange = (e) => {
    const id = e.target.id;
    const data = e.target.value;
    this.updateState("error", "");
    switch (id) {
      case "origin":       
        const origin = new google.maps.places.SearchBox(e.target);
        this.updateState("origin", data);      
        break;
      case "destination": 
        let destination = new google.maps.places.SearchBox(e.target);
        this.updateState("destination", data);        
        break;
      default: 
        return;
    };
  };

  onHandleData = () => {
    this.props.onHandleData({
      description: "Travel",
      mileageType: "googleMaps",
      origin: this.state.origin,
      destination: this.state.destination,
      totalMiles: this.state.totalMiles,
      totalCost: parseFloat(this.state.totalCost, 10) * 100,
      error: this.state.error
    });
  };

  calculateDistance = (origin, destination) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.IMPERIAL,
      avoidHighways: false,
      avoidTolls: false
    }, this.getDistance);
  };

  getDistance = (response, status) => {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      this.updateState("error", "There was a problem retrieving map information from the Google servers.");
    } else {
      if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
        this.updateState("error", "There was a problem with the places you entered, make sure you select the correct address for your country.");
      } else {
        // clear error
        const distance = response.rows[0].elements[0].distance;
        const distanceValue = distance.value;
        const distanceText = distance.text;
        const totalMiles = Math.ceil(distanceText.substring(0, distanceText.length - 3));
        const totalCost = totalMiles * this.props.pricePerMile;

        this.updateState("totalMiles", totalMiles);
        this.updateState("totalCost", totalCost);
      };
    };
  };

  render() {
    return (
      <div>
        <div className="googlemaps">
         <h2 className="googlemaps__title">Google Maps</h2>
         <div className="googlemaps__icon"></div>
        </div>        
        <div className="input-group__item">
        <label>Origin:
          <input
            type="text"
            id="origin"
            placeholder="Origin"
            className="text-input text-input__other"
            value={this.state.origin}
            onChange={this.onChange}
            ref={(input) => {this.googleMapsOrigin = input}}
          />
          </label>
          </div>
          <div className="input-group__item">
          <label>Destination:
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            className="text-input text-input__other"
            value={this.state.destination}      
            onChange={this.onChange}
            ref={(input) => {this.googleMapsDestination = input}}
            onFocus={this.onSetOrigin}
          />
          </label>
          </div>
          <div className="input-group__item">
          <div className="input-group">
            <label>Total Miles:
              <input
                type="number"
                id="totalMiles"
                placeholder="Total miles"
                className="text-input"
                value={this.state.totalMiles}
                readOnly={true}
                onFocus={this.onSetDestination}
              />
              </label>
              <label>Total Cost:
              <input
                type="number"
                id="totalCost"
                placeholder="Total Cost (£)"
                className="text-input"
                value={this.state.totalCost}
                readOnly={true}            
              />
            </label>
            </div>
          </div>        
      </div>

    );
  };
};

export default GoogleMapsForm;