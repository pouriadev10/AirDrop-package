/**
 * Handle request timeout with retries
 * @param {Promise} requestPromise - Request promise
 * @param {number} [backOff=0] - Backoff time
 * @param {number} [retryCount=1] - Number of retries
 * @returns {Promise<any>} - Response from the request
 */
export const handleRequestTimeout = async (requestPromise, backOff = 0, retryCount = 1) => {
    let tx = null;
    for (let i = 0; i < retryCount - 1; i++) {
        tx = await requestPromise;
        if (tx) return tx;
        await new Promise(resolve => setTimeout(resolve, backOff));
    }
    return await requestPromise;
};

export default {
    handleRequestTimeout,
};