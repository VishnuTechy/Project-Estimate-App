import React, { useState } from "react";
import "./App.css";
import Table from "./MainTable";
import DetailsPage from "./DetailsPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Concept Development",
      estimate: 0,
      actual: 0,
      subsections: [],
    },
    {
      id: 2,
      name: "Location Scouting",
      estimate: 0,
      actual: 0,
      subsections: [],
    },
    { id: 3, name: "Crew Hiring", estimate: 0, actual: 0, subsections: [] },
  ]);

  const updateData = (id, updatedSubsections) => {
    console.log(updatedSubsections);
    let totalActual = updatedSubsections.reduce(
      (acc, sub) => acc + sub.actual,
      0
    );
    let totalEstimate = updatedSubsections.reduce(
      (acc, sub) => acc + sub.estimate,
      0
    );
    setData((prevData) =>
      prevData.map((row) =>
        row.id === parseInt(id)
          ? {
              ...row,
              estimate: totalEstimate,
              actual: totalActual,
              subsections: updatedSubsections,
            }
          : row
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table data={data} setData={setData} />} />
        <Route
          path="/details/:id"
          element={<DetailsPage data={data} updateData={updateData} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
