import React, { useState } from "react";
import { useHistory } from "react-router-dom";  // Import useHistory
import "./WingInformation.css";

const WingInformation = () => {
  const history = useHistory(); // Initialize useHistory
  const [numWings, setNumWings] = useState(1); // Default to 1 wing
  const [roomsPerFloor, setRoomsPerFloor] = useState(1); // Default to 1 room per floor

  const handleNumWingsChange = (e) => {
    setNumWings(parseInt(e.target.value) || 1); // Ensure at least 1 wing
  };

  const handleRoomsPerFloorChange = (e) => {
    setRoomsPerFloor(parseInt(e.target.value) || 1); // Ensure at least 1 room per floor
  };

  // Function to handle the previous button click
  const handlePrevious = () => {
    history.push("/signup/signup-society"); // Navigate back to the SignupSociety page
  };

  return (
    <div className="wing-container">
      <div className="form-container">
        <h1>Society Registration Form(2/4):</h1>
        <h2>Wing Information:</h2>

        <div className="form-group">
          <label>Number of Wings</label>
          <input
            type="number"
            value={numWings}
            onChange={handleNumWingsChange}
            placeholder="Enter number of wings"
            min="1"
          />
        </div>

        <div className="form-group">
          <label>Rooms per Floor</label>
          <input
            type="number"
            value={roomsPerFloor}
            onChange={handleRoomsPerFloorChange}
            placeholder="Enter rooms per floor"
            min="1"
          />
        </div>

        {/* Repeat this section for the number of wings entered by the user */}
        {[...Array(numWings)].map((_, wingIndex) => (
          <div key={wingIndex} className="wing-section">
            <h3>Details for Wing {wingIndex + 1}:</h3>
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="NAME" />
              <label>Floors</label>
              <input type="number" placeholder="FLOORS" />
              <label>Rooms/Floor</label>
              <input
                type="number"
                value={roomsPerFloor} // This value is based on user input
                readOnly
              />
            </div>

            <h4>Room Information (1st residential floor):</h4>
            <div className="room-info">
              {[...Array(roomsPerFloor)].map((_, roomIndex) => (
                <div key={roomIndex} className="room-group">
                  <label>Room Number</label>
                  <input type="text" placeholder="ROOM NUMBER" />
                  <label>Room Size</label>
                  <select>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                  <label>Maintenance Amount</label>
                  <input type="number" placeholder="Maintenance Amount" />
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="button-group">
          <button className="previous-button" onClick={handlePrevious}>PREVIOUS</button>
          <button className="next-button">NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default WingInformation;
