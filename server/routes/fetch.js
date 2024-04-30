const fetch = require('cross-fetch');
const apiKey = 'fxa_live_XchsSeXxjeDYb0LbUJF7jPxKOE27eFW9oZPOaeHk';

async function makeApiRequest(endpoint, method = 'GET', data = null) {
    //const url = `https://api.fxapi.com/${endpoint}`;
    const url = 'https://api.fxapi.com/v1/latest?apikey=fxa_live_XchsSeXxjeDYb0LbUJF7jPxKOE27eFW9oZPOaeHk&currencies=EUR%2CUSD%2CCAD'
    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    const requestOptions = {
        method: method,
        headers: headers
    };

    if (data) {
        requestOptions.body = JSON.stringify(data);
    }

    return fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error making API request:', error);
            throw error; // Propagate the error to the caller
        });
}

module.exports = {
    makeApiRequest
};
