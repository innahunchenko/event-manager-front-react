import React, { useEffect, useState } from "react";
import EntityTable from "../components/EntityTable";
import UserForm from "../components/UserForm";
import {
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../services/userService";

const columns = [
  "First Name",
  "Last Name",
  "Position",
  "Company",
  "Years of Experience",
  "Role",
];

const fieldNames = [
  "firstName",
  "lastName",
  "position",
  "company",
  "yearsOfExperience",
  "role",
];

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    yearsOfExperience: 0,
    role: "",
  });

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data || []);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async () => {
    if (selectedId) {
      const success = await deleteUser(selectedId);
      if (success) {
        setUsers((prev) => prev.filter((u) => u.id !== selectedId));
        setSelectedId(null);
      }
    }
  };

  const handleSave = async () => {
    const action = selectedId ? updateUser : createUser;

    try {
      const result = selectedId
        ? await action(selectedId, formData)
        : await action(formData);

      if (result) {
        setUsers((prev) =>
          selectedId
            ? prev.map((u) => (u.id === selectedId ? result : u))
            : [...prev, result]
        );
      }

      setShowModal(false);
      resetForm();
    } catch (err) {
      setError(err.message || "Failed to save user");
    }
  };

  const openEditModal = () => {
    const user = users.find((u) => u.id === selectedId);
    if (user) {
      setFormData(user);
      setShowModal(true);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
      company: "",
      yearsOfExperience: 0,
      role: "",
    });
    setSelectedId(null);
  };

  return (
    <div>
      <h1>Users</h1>

      <div style={{ marginBottom: "1rem" }}>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          Create
        </button>
        <button onClick={openEditModal} disabled={!selectedId}>
          Edit
        </button>
        <button onClick={handleDelete} disabled={!selectedId}>
          Delete
        </button>
      </div>

      <EntityTable
        data={users}
        fields={fieldNames}
        columns={columns}
        onSelect={setSelectedId}
        selectedId={selectedId}
      />

      {showModal && (
        <UserForm
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
          isEdit={!!selectedId}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UsersPage;
