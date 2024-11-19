import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

// Fetch all nodes
export const getNodes = async (token) => {
  const response = await axios.get(`${API_URL}/nodes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Fetch all edges
export const getEdges = async (token) => {
  const response = await axios.get(`${API_URL}/edges`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// **Add a New Node**
export const addNode = async (token, nodeData) => {
  const response = await axios.post(`${API_URL}/nodes/add`, nodeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// **Add a New Edge**
export const addEdge = async (token, edgeData) => {
  const response = await axios.post(`${API_URL}/edges/add`, edgeData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// **Update a Node's Position**
export const updateNodePosition = async (token, nodeId, position) => {
  const response = await axios.put(
    `${API_URL}/${nodeId}/position`,
    { position },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

// **Delete a Node**
export const deleteNode = async (token, nodeId) => {
  await axios.delete(`${API_URL}/${nodeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// **Delete an Edge**
export const deleteEdge = async (token, edgeId) => {
  await axios.delete(`${API_URL}/edges/${edgeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
