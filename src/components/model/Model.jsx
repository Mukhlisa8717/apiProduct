import React from "react";
import "./Model.scss";

const Model = ({ close, children }) => {
  return (
    <>
      <div onClick={() => close(false)} className="overlay"></div>
      <div className="model">{children}</div>
    </>
  );
};

export default Model;
