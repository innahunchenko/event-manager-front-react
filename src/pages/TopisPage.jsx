import React, { useEffect, useState } from "react";
import EntityTable from "../components/EntityTable";
import {
  getAllTopics,
  deleteTopic,
  createTopic,
  updateTopic,
} from "../services/topicService";
import EntityForm from "../forms/EntityForm";

const topicFields = [
  { name: "name", label: "Name", type: "text" },
  { name: "description", label: "Description", type: "text" },
  {
    name: "isActive",
    label: "Activity",
    type: "boolean",
    render: (value) =>
      value === true || value === "true" ? "Active" : "Inactive",
  }  
];

const initialFormState = topicFields.reduce((acc, field) => {
  switch (field.type) {
    case "number":
      acc[field.name] = 0;
      break;
    case "boolean":
      acc[field.name] = false;
      break;
    default:
      acc[field.name] = "";
  }
  return acc;
}, {});

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [formMode, setFormMode] = useState("create"); // 'create' | 'edit' | 'view'

  useEffect(() => {
    (async () => {
      const data = await getAllTopics();
      setTopics(data || []);
    })();
  }, []);

  const handleDelete = async () => {
    if (!selectedId) return;

    const success = await deleteTopic(selectedId);
    if (success) {
      setTopics((prev) => prev.filter((t) => t.id !== selectedId));
      setSelectedId(null);
    }
  };

  const handleSave = async () => {
    const action = formMode === "edit" ? updateTopic : createTopic;
    const args = formMode === "edit" ? [selectedId, formData] : [formData];

    try {
      const result = await action(...args);

      setTopics((prev) =>
        formMode === "edit"
          ? prev.map((t) => (t.id === selectedId ? result : t))
          : [...prev, result]
      );

      closeModal();
    } catch (err) {
      setError(err.message || "Failed to save topic");
    }
  };

  const openModal = (mode) => {
    const topic = topics.find((t) => t.id === selectedId);
    setFormMode(mode);
    setFormData(mode === "create" ? initialFormState : topic || initialFormState);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData(initialFormState);
    setFormMode("create");
  };

  return (
    <div>
      <h1>Topics</h1>

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
        data={topics}
        columns={topicFields}
        selectedId={selectedId}
        onSelect={setSelectedId}
      />

      {showModal && (
        <EntityForm
          entityName="topic"
          fields={topicFields}
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

export default TopicsPage;
