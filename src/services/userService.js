import { apiFetch } from "./apiClient";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function getAllUsers() {
  return await apiFetch(`/users`);
}

export async function createUser(user) {
  return await apiFetch(`/users/create`, {
    method: "POST",
    body: JSON.stringify(user),
  });
}

export async function updateUser(id, patch) {
  return await apiFetch(`/users/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteUser(id) {
  return await apiFetch(`/users/${id}`, {
    method: "DELETE",
  });
}

export async function assignEventsToUser(id, eventIds) {
  return await apiFetch(`/users/assign-events/${id}`, {
    method: "POST",
    body: JSON.stringify({ eventIds }),
  });
}

export async function getUserEvents(id) {
  return await apiFetch(`/users/events/${id}`);
}
