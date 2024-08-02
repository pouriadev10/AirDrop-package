/**
 * Join URL segments
 * @param {...string} segments - URL segments
 * @returns {string} - Joined URL
 */
export const joinUrlSegments = async (...segments) => {
    console.log(segments);
    return segments.map((segment, index) => {
        if (segment === undefined) {
            console.error('Undefined segment found in joinUrlSegments');
            return '';
        }
        if (index === segments.length - 1) {
            return segment.replace(/^\/|\/$/g, '') + '/';
        }
        return segment.replace(/^\/|\/$/g, '');
    }).join('/');
};

/**
 * Get Program Network URL
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} programId - Program ID
 * @returns {Promise<string>} - Network provider URL
 */
export const getProgramNetworkUrl = async (backendUrl, appRoot, authToken, programId) => {
    const endpoint = "api/get-program-network-url/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint, programId.toString());
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in getting program network URL: ${JSON.stringify(result)}`);
    }
    return result.network_provider_url; 
};

/**
 * Get Token Network URL
 * @param {string} backendUrl - Backend URL
 * @param {string} appRoot - Application root path
 * @param {string} authToken - Authentication token
 * @param {string} mintTokenId - Mint token ID
 * @returns {Promise<string>} - Network provider URL
 */
export const getTokenNetworkUrl = async (backendUrl, appRoot, authToken, mintTokenId) => {
    const endpoint = "api/get-token-network-url/";
    const url = await joinUrlSegments(backendUrl, appRoot, endpoint, mintTokenId.toString());
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken,
        },
    });
    const result = await response.json();
    if (!response.ok) {
        console.error(`Error in getting token network URL: ${JSON.stringify(result)}`);
    }
    return result.network_provider_url; 
};