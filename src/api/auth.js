import { joinUrlSegments } from "../utils/urlHelper";
import { getRandomToken, sendAuthSignature } from "../utils/authHelper";

/**
 * Blockchain Login
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {object} wallet - Wallet object
 * @param {string} network - Network name
 * @param {string} provider - Provider name
 * @returns {Promise<object>} - Login result
 */
export const blockchainLogin = async (backendUrl, appRoot, wallet, network, provider) => {
    const endpoint = "blockchain-login/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);

    const token = await getRandomToken(backendUrl, appRoot);

    const encodedMessage = new TextEncoder().encode(token);
    const signedMessage = await wallet.signMessage(encodedMessage, 'utf8');
    const signature = Buffer.from(signedMessage).toString('hex');

    const result = await sendAuthSignature(url, wallet, signature, network, provider);
    return result;
};

/**
 * Blockchain Signup
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {object} wallet - Wallet object
 * @param {string} network - Network name
 * @param {string} provider - Provider name
 * @param {object} authData - Additional authentication data
 * @returns {Promise<object>} - Signup result
 */
export const blockchainSignup = async (backendUrl, appRoot, wallet, network, provider, authData) => {
    const endpoint = "blockchain-signup/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);

    const token = await getRandomToken(backendUrl, appRoot);

    const encodedMessage = new TextEncoder().encode(token);
    const signedMessage = await wallet.signMessage(encodedMessage, 'utf8');
    const signature = Buffer.from(signedMessage).toString('hex');

    const result = await sendAuthSignature(url, wallet, signature, network, provider, authData);
    return result;
};
