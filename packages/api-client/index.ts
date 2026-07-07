import { API_URL } from '@repo/constants';

export const fetchData = async (endpoint: string) => {
  console.log(`[API Client] Fetching from ${API_URL}${endpoint}...`);
  // Simulate network request
  return new Promise((resolve) => setTimeout(() => resolve({ status: 200, data: 'Fake Data' }), 500));
};
