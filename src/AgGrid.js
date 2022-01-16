import React from "react";
import "./aggrid.css";
const AgGrid = () => {
  const columns = [
    {
      title: "Sr Number",
    },
    {
      title: "Name",
    },
    {
      title: "PhoneNumber",
    },
    {
      title: "Actual Money",
    },
    {
      title: "Interest",
    },
    {
      title: "Current Money",
    },
    {
      title: "Action",
    },
    {
      title: "View Transaction",
    },
  ];
  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Murari Kumar</td>
            <td>7799169804</td>
            <td>50000</td>
            <td>2000</td>
            <td>5200</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AgGrid;
