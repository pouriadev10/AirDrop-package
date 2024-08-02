import bs58 from 'bs58';
import { VersionedMessage, VersionedTransaction } from '@solana/web3.js';
import { joinUrlSegments } from './urlHelper';


/**
 * Sign a transaction
 * @param {object} wallet - Wallet object
 * @param {string} assembledTransaction - Assembled transaction
 * @returns {Promise<string>} - Encoded signed transaction
 */
export const signTransaction = async (wallet, assembledTransaction) => {
    const assembledTransactionBytes = new Uint8Array(bs58.decode(assembledTransaction));
    const versionedMessage = VersionedMessage.deserialize(assembledTransactionBytes);
    const transaction = new VersionedTransaction(versionedMessage);
    const signedTransaction = await wallet.signTransaction(transaction);
    const serializedTransaction = signedTransaction.serialize();
    const encodedTransaction = bs58.encode(serializedTransaction);
    return encodedTransaction;
};


/**
 * Send a signed transaction
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} encodedTransaction - Encoded signed transaction
 * @param {string|null} mintTokenId - Mint token ID
 * @param {string|null} programId - Program ID
 * @returns {Promise<string>} - Transaction signature
 */
export const sendTransaction = async (backendUrl, appRoot, authToken, encodedTransaction, mintTokenId = null, programId = null) => {
    const endpoint = "api/send-signed-transaction/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = { signed_transaction: encodedTransaction };
    if (mintTokenId) {
        payload["mint_token"] = mintTokenId;
    }
    if (programId) {
        payload["program"] = programId;
    }
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
        console.error(`Error in sending transaction: ${JSON.stringify(result)}`);
    }
    return result.signature;
};
