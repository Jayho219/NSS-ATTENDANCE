const BASE_URL = 'http://localhost:5000';

export const checkAuth = async () => {
  try {
    const token = localStorage.getItem('token'); 

    const response = await fetch(`${BASE_URL}/checkAuth`, {
      method: 'GET',
      // Include cookies for authentication
      credentials: 'include', 
      headers: {
        // Include the token in the 'Authorization' header
        Authorization: `Bearer ${token}` 
      }
    });

    if (response.ok) {
      const data = await response.json();

      console.log(data.adminType);

      const list = [data.success, data.adminType];
      return list; 
    }

    throw new Error('Authentication check failed');
  } 
  catch (error) {
    console.error('Authentication check error:', error);
    return false; 
  }
};
