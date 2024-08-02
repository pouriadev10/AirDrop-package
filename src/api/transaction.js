import { joinUrlSegments } from "../utils/urlHelper";

/**
 * Get User Transactions List
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @returns {Promise<object>} - List of user transactions
 */
export const GetUserTransactionsList = async (backendUrl, appRoot, authToken) => {
    const endpoint = "api/user-transactions-list/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in getting user transactions list: ${JSON.stringify(result)}`);
    }
    return result;
};