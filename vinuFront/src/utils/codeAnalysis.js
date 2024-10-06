import axios from 'axios';

export const analyzeCode = async (code, language) => {
  const endpoint = language === 'javascript' 
    ? 'http://localhost:3001/analyze'
    : 'http://localhost:3002/analyze';  // New Python microservice endpoint

  const response = await axios.post(endpoint, { code });
  return response.data;
};