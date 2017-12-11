import React from "react";

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
  }

  
  updateState = (state, data) => {
    return new Promise(
      (resolve, reject) => {
        resolve(this.setState({ [state]: data }, () => { this.onHandleData() }));
      }
    );    
  };

  googleMapsOrigin = () => this.googleMapsOrigin;
  googleMapsDestination = () => this.googleMapsDestination;

  placesEventListener = (searchbox, state) => {
    return new Promise(
      (resolve, reject) => {        
        google.maps.event.addDomListener(this.googleMapsOrigin, "keydown", (e) => {
          if (e.keyCode === 13) { e.preventDefault(); e.stopPropagation(); }
        })
        const autocomplete = new google.maps.places.Autocomplete(searchbox);
        autocomplete.addListener("place_changed" , () => {
          const place = autocomplete.getPlace().formatted_address;
          resolve(this.updateState(state, place));
          console.log("hello");
        });
      }).then(() => {        
    });
  }

  onChange = (e) => {
    const id = e.target.id;
    const data = e.target.value;

    switch (id) {
      case "origin":
        google.maps.event.addDomListener(this.googleMapsOrigin, "keydown", (e) => {
          if (e.keyCode === 13) { e.preventDefault(); e.stopPropagation(); }
        })
        const origin = new google.maps.places.SearchBox(e.target);
        this.updateState("origin", data);      

        break;
      case "destination": 
        let destination = new google.maps.places.SearchBox(e.target);
        this.updateState("destination", data);        
        break;
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
  }   

  

  getDistance = (response, status) => {
    if (status != google.maps.DistanceMatrixStatus.OK) {
      this.setState({ error: "There was a problem retrieving map information from the Google servers."})
    } else {
      const origin = response.originAddresses[0];
      const destination = response.destinationAddresses[0];
      if (response.rows[0].elements.status == "ZERO_RESULTS") {
        this.setState({ error: "There was a problem with the places you entered, make sure you select the correct address for your country." })
      } else {
        // clear error
        const distance = response.rows[0].elements[0].distance;
        const distanceValue = distance.value;
        const distanceText = distance.text;
        const totalMiles = Math.ceil(distanceText.substring(0, distanceText.length - 3));
        const totalCost = totalMiles * this.props.pricePerMile.value;

        this.updateState("totalMiles", totalMiles);
        this.updateState("totalCost", totalCost);
      }
    }
  }

  render() {
    return (
      <div>
        <h2>Google Maps</h2>
        <label>Origin:
          <input
            type="text"
            id="origin"
            placeholder="Origin"
            className="text-input text-input__other"
            value={this.state.origin}
            onChange={this.onChange}
            ref={(input) => {this.googleMapsOrigin = input}}
            onFocus={this.onFocus}
          />
          </label>
          <label>Destination:
          <input
            type="text"
            id="destination"
            placeholder="Destination"
            className="text-input text-input__other"
            value={this.state.destination}      
            onChange={this.onChange}
            ref={(input) => {this.googleMapsDestination = input}}
            onFocus={this.onFocus}
          />
          </label>
          {this.state.error && <p className="form__error">{this.state.error}</p>}
          <div className="input-group">
        <label>Total Miles:
          <input
            type="number"
            id="totalMiles"
            placeholder="Total miles"
            className="text-input"
            value={this.state.totalMiles}
            readOnly={true}
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
          {this.state.error && <p className="form__error">{this.state.error}</p>}   
      </div>

    );
  }
}

export default GoogleMapsForm;