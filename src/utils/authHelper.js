import { joinUrlSegments } from './urlHelper';

/**
 * Get a random token
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @returns {Promise<string>} - Random token
 */
export const getRandomToken = async (backendUrl, appRoot) => {
    const endpoint = "get-random-token/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const response = await fetch(url, { credentials: "include" });
    const result = await response.json();
    return result.token;
};

/**
 * Send authentication signature
 * @param {string} endpoint - API endpoint
 * @param {object} wallet - Wallet object
 * @param {string} signature - Signature
 * @param {string} network - Network name
 * @param {string} provider - Provider name
 * @param {object} [authData={}] - Additional authentication data
 * @returns {Promise<object>} - Authentication result
 */
export const sendAuthSignature = async (endpoint, wallet, signature, network, provider, authData = {}) => {
    const walletAddress = wallet.publicKey.toString();
    const payload = { ...authData, wallet_address: walletAddress, signature, network, provider };
    const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in sending authentication signature: ${JSON.stringify(result)}`);
    }
    return result;
};

export default {
    getRandomToken,
    sendAuthSignature,
};