import { joinUrlSegments } from "../utils/urlHelper";
import { sendTransaction, signTransaction } from '../utils/transactionHelper';

export const GetTaskList = async (backendUrl, appRoot, authToken, status) => {
    const endpoint = "api/task-list/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
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


export const CreateTask = async (backendUrl, appRoot, authToken, wallet, programId, taskName, data) => {
    const endpoint = "api/create-task/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint);
    const payload = {
        program: programId,
        name: taskName,
        data: data,
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
    const encodedTransaction = await signTransaction(wallet, result.assembledTransaction);
    const signature = await sendTransaction(backendUrl, appRoot, authToken, encodedTransaction);
    return signature;
}