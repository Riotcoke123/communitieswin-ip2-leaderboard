require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

// Define the JSON save path
const filePath = path.join('data.json');

// Ensure the directory exists before writing the file
const directory = path.dirname(filePath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

// Function to fetch and process rankings
async function getRankings() {
  try {
    const response = await axios.get('https://communities.win/api/v2/post/newv2.json?community=ip2always', {
      headers: {
        'accept': process.env.API_ACCEPT || 'application/json, text/plain, */*',
        'accept-encoding': process.env.API_ACCEPT_ENCODING || 'gzip, deflate, br, zstd',
        'accept-language': process.env.API_ACCEPT_LANGUAGE || 'en-US,en;q=0.9',
        'priority': process.env.API_PRIORITY || 'u=1, i',
        'referer': process.env.API_REFERER || 'https://communities.win/c/IP2Always/new',
        'sec-ch-ua': process.env.API_SEC_CH_UA || '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
        'sec-ch-ua-mobile': process.env.API_SEC_CH_UA_MOBILE || '?0',
        'sec-ch-ua-platform': process.env.API_SEC_CH_UA_PLATFORM || '"Windows"',
        'sec-fetch-dest': process.env.API_SEC_FETCH_DEST || 'empty',
        'sec-fetch-mode': process.env.API_SEC_FETCH_MODE || 'cors',
        'sec-fetch-site': process.env.API_SEC_FETCH_SITE || 'same-origin',
        'user-agent': process.env.API_USER_AGENT || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'x-api-key': process.env.API_KEY || '',
        'x-api-platform': process.env.API_PLATFORM || 'Scored-Desktop',
        'x-api-secret': process.env.API_SECRET || '',
        'x-xsrf-token': process.env.API_XSRF_TOKEN || ''
      }
    });

    const data = response.data;
    if (!data || !Array.isArray(data.posts)) {
      throw new Error('Invalid data format.');
    }

    const rankings = data.posts.map((post) => ({
      username: post.author,
      score: post.score_up * 120,
      profileLink: `https://communities.win/u/${post.author}`
    }));

    rankings.sort((a, b) => b.score - a.score);

    return rankings.map((entry, index) => ({
      rank: index + 1,
      ...entry
    }));

  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// Function to update rankings and save them to the JSON file
async function updateRankings() {
  const rankings = await getRankings();

  try {
    fs.writeFileSync(filePath, JSON.stringify(rankings, null, 2), 'utf-8');
    console.log(`Rankings updated and saved to ${filePath} at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Error saving data to file:', err);
  }
}

// Update rankings every 15 minutes
setInterval(updateRankings, 15 * 60 * 1000);
updateRankings(); // Run immediately on startup

// API Endpoint to get rankings
app.get('/rankings', async (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Rankings file not found' });
    }
    const rankings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(rankings);
  } catch (err) {
    console.error('Error reading data file:', err);
    res.status(500).json({ error: 'Failed to load rankings' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
