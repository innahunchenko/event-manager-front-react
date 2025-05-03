import React, { useEffect, useState } from "react";
import { apiFetch } from "../utils/api";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        const data = await apiFetch("/users");
        setUsers(data || []);
      } catch (err) {
        console.error("API error:", err);
        const title = err?.title || "Error";
        const detail = err?.detail || "Something went wrong";
        setError(`${title}: ${detail}`);
      }
    }

    loadUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Company</th>
              <th>Experience</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.firstName} {u.lastName}</td>
                <td>{u.position}</td>
                <td>{u.company}</td>
                <td>{u.yearsOfExperience}</td>
                <td>{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UsersPage;
