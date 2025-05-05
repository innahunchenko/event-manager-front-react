import React from "react";
import "./EntityForm.css";

const EntityForm = ({
  entityName,
  fields,
  formData,
  setFormData,
  onSave,
  onCancel,
  formMode = "create", // 'create' | 'edit' | 'view'
}) => {
  const isView = formMode === "view";
  const isEdit = formMode === "edit";

  const getTitle = () => {
    const capitalized = entityName[0].toUpperCase() + entityName.slice(1);
    switch (formMode) {
      case "view":
        return `View ${capitalized}`;
      case "edit":
        return `Edit ${capitalized}`;
      default:
        return `Create ${capitalized}`;
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{getTitle()}</h3>
        {fields.map(({ name, label, type }) => (
          <div key={name} className="form-group">
            <label>
              {label}:{" "}
              <input
                type={type === "boolean" ? "checkbox" : type}
                checked={type === "boolean" ? formData[name] : undefined}
                value={type !== "boolean" ? formData[name] : undefined}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    [name]:
                      type === "boolean" ? e.target.checked : e.target.value,
                  })
                }
                disabled={isView}
              />
            </label>
          </div>
        ))}
        <div className="button-group">
          {!isView && (
            <button className="primary" onClick={onSave}>
              {isEdit ? "Update" : "Create"}
            </button>
          )}
          <button onClick={onCancel}>{isView ? "Close" : "Cancel"}</button>
        </div>
      </div>
    </div>
  );
};

export default EntityForm;
