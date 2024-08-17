import { Connection } from '@solana/web3.js';
import { joinUrlSegments, getProgramNetworkUrl } from '../utils/urlHelper';
import { sendTransaction, signTransaction } from '../utils/transactionHelper';
import { handleRequestTimeout } from '../utils/timeoutHelper';

/**
 * Call a Program Instruction
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {object} wallet - Wallet object
 * @param {string} programId - Program ID
 * @param {string} instructionName - Instruction name
 * @param {object} [data={}] - Additional data
 * @returns {Promise<string|null>} - Transaction signature or null if failed
 */
export const CallProgramInstruction = async (backendUrl, appRoot, authToken, wallet, programId, instructionName, data = {}) => {
    const endpoint = "api/assemble-program-transaction/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
        program: programId,
        instruction_name: instructionName,
        data: data
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        console.error(`Error in assembling program Transaction: ${JSON.stringify(await response.json())}`);
        return null;
    }
    const result = await response.json();
    const encodedTransaction = await signTransaction(wallet, result.assembledTransaction);
    const signature = await sendTransaction(backendUrl, appRoot, authToken, encodedTransaction, null, programId);
    return signature;
};

/**
 * Get Program Account
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} accountTypeName - Account type name
 * @returns {Promise<object>} - Program account details
 */
export const GetProgramAccount = async (backendUrl, appRoot, authToken, programId, accountTypeName) => {
    const endpoint = "api/fetch-program-account/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
        program: programId,
        account_type_name: accountTypeName,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
        body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in fetching program account: ${JSON.stringify(result)}`);
    }
    return result.account;
};

/**
 * Get Parsed Transaction for a Program
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Parsed transaction details
 */
export const getProgramParsedTransaction = async (backendUrl, appRoot, authToken, programId, signature, commitment = "confirmed", backOff = 0, retryCount = 1) => {
    const networkUrl = await getProgramNetworkUrl(backendUrl, appRoot, authToken, programId);
    const connection = new Connection(networkUrl);
    const requestPromise = connection.getParsedTransaction(signature, commitment);
    return await handleRequestTimeout(requestPromise, backOff, retryCount);
};

/**
 * Get Transaction for a Program
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @param {string} signature - Transaction signature
 * @param {string} [commitment="confirmed"] - Commitment level
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<object>} - Transaction details
 */
export const getProgramTransaction = async (backendUrl, appRoot, authToken, programId, signature, commitment = "confirmed", backOff = 0, retryCount = 1) => {
    const networkUrl = await getProgramNetworkUrl(backendUrl, appRoot, authToken, programId);
    const connection = new Connection(networkUrl);
    const requestPromise = connection.getTransaction(signature, commitment);
    return await handleRequestTimeout(requestPromise, backOff, retryCount);
};


export const GetProgramList = async (backendUrl, appRoot, authToken) => {
    const endpoint = "api/program-list/";
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
    console.log(result, typeof(result))
    return result;
}