const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json());

const generatebaseUrl = (apiKey) => `http://api.scraperapi.com?api_key=${apiKey}&autoparse=true`;

app.get('/', async (req, res) => {
    res.send('Welcome to Amazon Scraper API!');
});

// Get product details
app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generatebaseUrl(api_key)}&url=https://www.amazon.in/dp/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        console.log(error.message);
    }
});

// Get product reviews
app.get('/products/:productId/reviews', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generatebaseUrl(api_key)}&url=https://www.amazon.in/product-reviews/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        console.log(error.message);
    }
});

// Get product offers
app.get('/products/:productId/offers', async (req, res) => {
    const { productId } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generatebaseUrl(api_key)}&url=https://www.amazon.in/gp/offer-listing/${productId}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        console.log(error.message);
    }
});

// Get search results
app.get('/search/:searchQuery', async (req, res) => {
    const { searchQuery } = req.params;
    const {api_key} = req.query;
    
    try {
        const response = await request(`${generatebaseUrl(api_key)}&url=https://www.amazon.in/s?k=${searchQuery}`);
        
        res.json(JSON.parse(response));
    } catch (error) {
        console.log(error.message);
    }
});



app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));
