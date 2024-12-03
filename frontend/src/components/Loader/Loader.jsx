import React from 'react';
import MoonLoader from "react-spinners/MoonLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader() {
  return (
    <div className="sweet-loading min-h-screen flex justify-center items-center">
      <MoonLoader
        color="#004fff"
        cssOverride={override}
        size={80}
      />
    </div>
  );
}

export default Loader;
