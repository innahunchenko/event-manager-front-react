import { createCrudClient, apiRequest } from "./apiClient";

const userClient = createCrudClient("users");

export const getAllUsers = userClient.getAll;
export const createUser = userClient.create;
export const updateUser = userClient.update;
export const deleteUser = userClient.delete;

export async function assignEventsToUser(id, eventIds) {
  return await apiRequest(`users/assign-events/${id}`, "POST", eventIds);
}

export async function getUserEvents(id) {
  return await apiRequest(`users/events/${id}`, "GET");
}
