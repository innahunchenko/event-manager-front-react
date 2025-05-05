const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export function createCrudClient(resource) {
  return {
    getAll: () => apiRequest(resource),
    create: (data) => apiRequest(`${resource}/create`, "POST", data),
    update: (id, data) => apiRequest(`${resource}/${id}`, "POST", data),
    delete: (id) => apiRequest(`${resource}/${id}`, "DELETE"),
  };
}

export async function apiRequest(resource, method = "GET", data = null) {
  const options = { method };
  if (data) options.body = JSON.stringify(data);
  return await apiFetch(`/${resource}`, options);
}

async function apiFetch(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  const config = {
    ...options,
    headers: {
      ...(options.headers || {}),
      "Content-Type": "application/json",
      "X-Api-Key": API_KEY,
    },
  };

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch {
      errorBody = { title: "Error", detail: response.statusText };
    }

    const error = new Error(errorBody.detail || "Unknown error");
    error.title = errorBody.title || "Error";
    error.status = response.status;
    error.detail = errorBody.detail;
    throw error;
  }

  return response.json();
}
