import React, { useState } from "react";
import axios from "axios";
// const dotenv = require('dotenv');
import { useNavigate } from "react-router-dom";
import './Homepage.css';

const backendUrl = process.env.REACT_APP_BACKENDURL;

function HomePage() {
  const [customListName, setCustomListName] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log("here 3");
      const response = await axios.get(
        `${backendUrl}/user/${customListName}`
      );
      // console.log("Response received:", response);
      console.log("Response data:", response.data);
      const { listitle } = response.data;
      console.log("List title:", listitle);
      navigate(`/${customListName}`);
    } catch (error) {
      console.error("Error fetching custom list:", error);
    }
  };
  

  return (
    <div className="homepage">
      <div className="container">
        <h1 className="title">Enter The Name of Your Custom ToDo-Page✏️</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            value={customListName}
            onChange={(e) => setCustomListName(e.target.value)}
            className="input"
            placeholder="Custom ToDo-Page Name..."
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default HomePage;
