// authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to log in. Please check your credentials.');
  }
};
