import { joinUrlSegments } from "../utils/urlHelper";
import { sendTransaction, signTransaction } from '../utils/transactionHelper';



export const GetUserInstructionCalls = async (backendUrl, appRoot, authToken, instructionType, status) => {
    const endpoint = "api/user-instruction-call-list/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);

    const payload = {
        instruction_type: instructionType,
        status: status,
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
        console.error(`Error in getting user transactions list: ${JSON.stringify(result)}`);
    }
    console.log(result, typeof(result))
    return result;
}


export const AssembleInstructionCallTransaction = async (backendUrl, appRoot, authToken, wallet, instructionCallId) => {
    const endpoint = "api/assemble-instruction-call-transaction/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
        instruction_call: instructionCallId,
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