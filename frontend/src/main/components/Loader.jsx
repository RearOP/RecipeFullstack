import React from "react";
import "../../assets/css/preloader.css";
const Preloader = () => {
  return (
    <>
      <div id="cooking">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div id="area">
          <div id="sides">
            <div id="pan"></div>
            <div id="handle"></div>
          </div>
          <div id="pancake">
            <div id="pastry"></div>
          </div>
        </div>
      </div>
      <h1 className="loadingHeading">Loading Your Recipe</h1>
    </>
  );
};

export default Preloader;
