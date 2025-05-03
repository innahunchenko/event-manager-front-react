import React, { useEffect, useState } from "react";
import "./EntityTable.css";

export default function EntityTable({ title, endpoint, fields }) {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    fetch(`${endpoint}?page=${page}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then(setData)
      .catch(console.error);
  }, [page]);

  const handleDelete = () => {
    if (selectedId) {
      fetch(`${endpoint}/${selectedId}`, { method: "DELETE" })
        .then(() => setData(prev => prev.filter(x => x.id !== selectedId)))
        .catch(console.error);
    }
  };

  return (
    <div className="table-container">
      <h2>{title}</h2>

      <div className="button-group">
        <button>Create New</button>
        <button disabled={!selectedId}>Update</button>
        <button disabled={!selectedId} onClick={handleDelete}>Delete</button>
      </div>

      <table className="entity-table">
        <thead>
          <tr>
            {fields.map(field => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr
              key={item.id}
              className={item.id === selectedId ? "selected-row" : ""}
              onClick={() => setSelectedId(item.id)}
            >
              {fields.map(field => (
                <td key={field}>{item[field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(p - 1, 1))} disabled={page === 1}>Prev</button>
        <span>Page {page}</span>
        <button onClick={() => setPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}
