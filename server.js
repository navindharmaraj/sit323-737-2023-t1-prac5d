const express = require('express');
const axios = require('axios');
const http = require('https');
const app = express();

// Endpoint to send GET request to other container
app.get('/api/data', async (req, res) => {
  try {
    const response = await axios.get('http://my-other-container:5006/data');
    res.send(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error getting data from other container');
  }
});
app.get('/data', async (req, res) => {
    try {
      const response = 'Hello there';
      res.send(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error getting data from other container');
    }
  });
app.get('/api/health', async (req, res) => {
    try {
        const status = {
            status: 'OK',
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
          };
          res.json(status);

    } catch (error) {
        addErrorLog(error.message);
        res.json({ statusCode: 500, result: null, message: error.message })
    }
});

app.listen(5006, () => {
  console.log('My Node app listening on port 5006');
});
