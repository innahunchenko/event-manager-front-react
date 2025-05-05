import React from "react";
import "./EntityTable.css";

export default function EntityTable({ data, columns, selectedId, onSelect }) {
  return (
    <table>
      <thead>
        <tr>
          {columns.map(({ label }) => (
            <th key={label}>{label}</th>
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
            {columns.map(({ name, render }) => (
              <td key={name}>
                {render ? render(item[name], item) : item[name]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
