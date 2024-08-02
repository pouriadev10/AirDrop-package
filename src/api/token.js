import { Connection } from '@solana/web3.js';
import { joinUrlSegments, getTokenNetworkUrl } from '../utils/urlHelper';
import { sendTransaction, signTransaction } from '../utils/transactionHelper';
import { handleRequestTimeout } from '../utils/timeoutHelper';

/**
 * Get User Associated Token Address (ATA)
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @returns {Promise<string|null>} - User ATA address or null if not found
 */
export const getUserATA = async (backendUrl, appRoot, authToken, mintTokenId) => {
    const endpoint = "api/get-user-ata/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
        body: JSON.stringify({
            mint_token: mintTokenId,
        }),
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in getting user ATA: ${JSON.stringify(result)}`);
        return null;
    } else if (result.hasATA) {
        return result.ATAAddress;
    }
    return null;
};

/**
 * Create an Associated Token Account (ATA)
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {object} wallet - Wallet object
 * @param {string} mintTokenId - Mint token ID
 * @returns {Promise<string|null>} - Transaction signature or null if failed
 */
export const CreateATA = async (backendUrl, appRoot, authToken, wallet, mintTokenId) => {
    const endpoint = "api/assemble-ata-transaction/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
        body: JSON.stringify({
            mint_token: mintTokenId,
        }),
    });
    if (!response.ok) {
        console.error(`Error in creating user ATA Transaction: ${JSON.stringify(await response.json())}`);
        return null;
    }
    const result = await response.json();
    const encodedTransaction = await signTransaction(wallet, result.assembledTransaction);
    const signature = await sendTransaction(backendUrl, appRoot, authToken, encodedTransaction, mintTokenId, null);
    return signature;
};

/**
 * Get Parsed Transaction for a Token
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Parsed transaction details
 */
export const getTokenParsedTransaction = async (backendUrl, appRoot, authToken, mintTokenId, signature, commitment = "confirmed", backOff = 0, retryCount = 1) => {
    const networkUrl = await getTokenNetworkUrl(backendUrl, appRoot, authToken, mintTokenId);
    const connection = new Connection(networkUrl);
    const requestPromise = connection.getParsedTransaction(signature, commitment);
    return await handleRequestTimeout(requestPromise, backOff, retryCount);
};

/**
 * Get Transaction for a Token
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Transaction details
 */
export const getTokenTransaction = async (backendUrl, appRoot, authToken, mintTokenId, signature, commitment = "confirmed", backOff = 0, retryCount = 1) => {
    const networkUrl = await getTokenNetworkUrl(backendUrl, appRoot, authToken, mintTokenId);
    const connection = new Connection(networkUrl);
    const requestPromise = connection.getTransaction(signature, commitment);
    return await handleRequestTimeout(requestPromise, backOff, retryCount);
};