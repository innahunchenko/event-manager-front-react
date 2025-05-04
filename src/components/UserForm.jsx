import React from "react";

const UserForm = ({
  formData,
  setFormData,
  onSave,
  onCancel,
  isEdit = false,
}) => {
  const fieldNames = [
    "firstName",
    "lastName",
    "position",
    "company",
    "yearsOfExperience",
    "role",
  ];

  return (
    <div style={{ border: "1px solid gray", padding: "1rem", marginTop: "1rem" }}>
      <h3>{isEdit ? "Edit User" : "Create User"}</h3>
      {fieldNames.map((name) => (
        <div key={name}>
          <label>
            {name}:{" "}
            <input
              type={name === "yearsOfExperience" ? "number" : "text"}
              value={formData[name]}
              onChange={(e) =>
                setFormData({ ...formData, [name]: e.target.value })
              }
            />
          </label>
        </div>
      ))}
      <button onClick={onSave}>{isEdit ? "Update" : "Create"}</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default UserForm;
