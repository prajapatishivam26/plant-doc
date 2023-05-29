import React, { useState } from "react";

const CurePage = () => {

  const [cureData, setCureData] = useState(JSON.parse(sessionStorage.getItem("cureData")));

  const displayCure = () => {
    return <div className="card">
    <div className="card-body">
    <img
      className=""
      style={{ display: "block", margin: "auto" }}
      src={cureData.cure.image}
      alt=""
    />
    <h1 className="mb-4 text-success text-center fw-bold">
      {cureData.cure.heading}
    </h1>
    <div className="row">
      <div className=""></div>
      <div className="col-md-12">
        <p className="h4">
          {
            cureData.cure.summary
          }
        </p>
      </div>
    </div>
    </div>
  </div>
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
          'url("https://cdn.kibrispdr.org/data/12/background-plang-14.jpg")',
      }}
    >
      <div className="container">
        {cureData ? (
          displayCure()
        ): (
          <h1 className="text-center">No Cure Found</h1>
        )}
      </div>
    </div>
  );
};

export default CurePage;
