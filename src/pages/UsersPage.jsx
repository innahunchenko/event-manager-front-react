import React, { useEffect, useState } from "react";
import EntityTable from "../components/EntityTable";
import {
  getAllUsers,
  deleteUser,
  createUser,
  updateUser,
} from "../services/userService";
import EntityForm from "../forms/EntityForm";

const userFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "position", label: "Position", type: "text" },
  { name: "company", label: "Company", type: "text" },
  { name: "yearsOfExperience", label: "Years of Experience", type: "number" },
  { name: "role", label: "Role", type: "text" },
];

const initialFormState = userFields.reduce((acc, field) => {
  acc[field.name] = field.type === "number" ? 0 : "";
  return acc;
}, {});

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formMode, setFormMode] = useState("create"); // 'create' | 'edit' | 'view'

  useEffect(() => {
    (async () => {
      const data = await getAllUsers();
      setUsers(data || []);
    })();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    const success = await deleteUser(selectedId);
    if (success) {
      setUsers((prev) => prev.filter((u) => u.id !== selectedId));
      setSelectedId(null);
    }
  };

  const handleSave = async () => {
    const action = formMode === "edit" ? updateUser : createUser;
    const args = formMode === "edit" ? [selectedId, formData] : [formData];

    try {
      const result = await action(...args);

      setUsers((prev) =>
        formMode === "edit"
          ? prev.map((u) => (u.id === selectedId ? result : u))
          : [...prev, result]
      );

      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save user");
    }
  };

  const openModal = (mode) => {
    const user = users.find((u) => u.id === selectedId);
    if (mode === "create") {
      setFormData(initialFormState);
    } else if (user) {
      setFormData(user);
    }
    setFormMode(mode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setFormMode("create");
  };

  return (
    <div>
      <h1>Users</h1>

      <div>
        <button onClick={() => openModal("create")}>Create</button>
        <button onClick={() => openModal("edit")} disabled={!selectedId}>
          Edit
        </button>
        <button onClick={() => openModal("view")} disabled={!selectedId}>
          View
        </button>
        <button onClick={handleDelete} disabled={!selectedId}>
          Delete
        </button>
      </div>

      <EntityTable
        data={users}
        columns={userFields}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {showModal && (
        <EntityForm
          entityName="user"
          fields={userFields}
          formData={formData}
          setFormData={setFormData}
          onSave={handleSave}
          onCancel={closeModal}
          formMode={formMode}
        />
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UsersPage;