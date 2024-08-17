import { joinUrlSegments } from "../utils/urlHelper";
import { sendTransaction, signTransaction } from '../utils/transactionHelper';


export const SignAndSendTransaction = async (backendUrl, appRoot, authToken, wallet, instructionTransactionId) => {
    const endpoint = "api/retrieve-assembled-transaction/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
        instruction_transaction: instructionTransactionId,
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
    const signature = await sendTransaction(backendUrl, appRoot, authToken, encodedTransaction);
    return signature;
};

