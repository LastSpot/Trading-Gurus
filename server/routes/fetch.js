const makeApiRequest = async (req, res) => {
    try {
      const apiKey = 'fxa_live_HxGvh5WvFtjRbvNvK4MGpm1tExlXlUWD8woMCwGk'; // Replace with your actual API key
      const baseCurrency = req.body.base_currency || 'USD'; // Default to USD if not provided
      const currencies = req.body.currencies || 'EUR'; // Optional list of comma-separated currencies
  
      const url = new URL('https://api.fxapi.com/v1/latest');
      url.searchParams.append('apikey', apiKey);
      url.searchParams.append('base_currency', baseCurrency);
  
      if (currencies) {
        url.searchParams.append('currencies', currencies);
      }
      console.log(url.toString())
      const response = await fetch(url.toString());
  
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
  
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('Error making API request:', error);
      res.status(500).json({ error: 'API request failed' }); // Generic error for client
    }
  };

  module.exports = makeApiRequest
