import React from "react";
import "./EntityTable.css";

export default function EntityTable({ data, columns, fields, selectedId, onSelect }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className={item.id === selectedId ? "selected" : ""}
            onClick={() => onSelect?.(item.id)}
          >
            {fields.map((field, idx) => (
              <td key={idx}>{item[field]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
