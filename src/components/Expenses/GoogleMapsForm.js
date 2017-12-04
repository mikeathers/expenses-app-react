import React from "react";

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

export default GoogleMapsForm;