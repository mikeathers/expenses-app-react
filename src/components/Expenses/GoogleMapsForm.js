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
    return new Promise(
      (resolve, reject) => {
        resolve(this.setState({ [state]: data }, () => { this.onHandleData() }));
      }
    );    
  };

  onChange = (e) => {
    const id = e.target.id;
    const data = e.target.value;

    switch (id) {
      case "origin":
        const origin = new google.maps.places.SearchBox(e.target);
        this.updateState("origin", data);        
        const originAutocomplete = new google.maps.places.Autocomplete(e.target);          
        originAutocomplete.addListener("place_changed", () => {
          const place = originAutocomplete.getPlace();
          this.updateState("origin", place.formatted_address);
        });
        break;
      case "destination": 
        let destination = new google.maps.places.SearchBox(e.target);
        this.updateState("destination", data);
        const destAutocomplete = new google.maps.places.Autocomplete(e.target);
        destAutocomplete.addListener("place_changed", () => {
          const place = destAutocomplete.getPlace().formatted_address;
          this.updateState("destination", place).then(() => {
            if (this.state.destination != null || undefined) {
              this.calculateDistance(this.state.origin, this.state.destination)
            }
          });
        });
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
    console.log("cost: ", this.state.totalCost);
    console.log("miles: ", this.state.totalMiles)
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
      console.log("error");
    } else {
      const origin = response.originAddresses[0];
      const destination = response.destinationAddresses[0];
      if (response.rows[0].elements.status == "ZERO_RESULTS") {
        console.log("no results");
      } else {
        // clear error
        const distance = response.rows[0].elements[0].distance;
        const distanceValue = distance.value;
        const distanceText = distance.text;
        const totalMiles = Math.ceil(distanceText.substring(0, distanceText.length - 3));
        const totalCost = totalMiles * this.props.pricePerMile.value;

        this.setState({
          totalMiles,
          totalCost
        });
      }
    }
  }

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
          />
          <input
            type="number"
            id="totalCost"
            placeholder="Total Cost (£)"
            className="text-input"
            value={this.state.totalCost}
          />
        </div>
      </div>

    );
  }
}

export default GoogleMapsForm;