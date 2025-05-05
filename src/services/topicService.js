import { createCrudClient } from "./apiClient";

const topicClient = createCrudClient("topics");

export const getAllTopics = topicClient.getAll;
export const createTopic = topicClient.create;
export const updateTopic = topicClient.update;
export const deleteTopic = topicClient.delete;
