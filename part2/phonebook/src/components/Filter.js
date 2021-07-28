import React from "react";

const Filter = ({ handleFilterChange, value }) => (
  <div>
    filter shown with: <input value={value} onChange={handleFilterChange} />
  </div>
);

export default Filter;
