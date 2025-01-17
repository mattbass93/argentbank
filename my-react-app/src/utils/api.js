import API_BASE_URL from '../config/apiconfiguration';

const apiFetch = async (endpoint, method = 'GET', body = null) => {
    const headers = { 'Content-Type': 'application/json' };
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

export default apiFetch;
