require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const filePath = path.join('data.json');
const directory = path.dirname(filePath);
if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

async function getRankings() {
  try {
    const response = await axios.get('https://communities.win/api/v2/post/newv2.json?community=ip2always', {
      headers: {
        'accept': process.env.API_ACCEPT || 'application/json, text/plain, */*',
        'user-agent': process.env.API_USER_AGENT || 'Mozilla/5.0',
        'x-api-key': process.env.API_KEY || '',
        'x-api-secret': process.env.API_SECRET || ''
      }
    });

    const data = response.data;
    if (!data || !Array.isArray(data.posts)) {
      throw new Error('Invalid data format.');
    }

    const userScores = {};
    data.posts.forEach((post) => {
      const username = post.author;
      const score = post.score_up * 120;
      if (userScores[username]) {
        userScores[username].score += score;
      } else {
        userScores[username] = {
          username,
          score,
          profileLink: `https://communities.win/u/${username}`
        };
      }
    });

    const rankings = Object.values(userScores).sort((a, b) => b.score - a.score);
    return rankings.map((entry, index) => ({ rank: index + 1, ...entry }));
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function updateRankings() {
  const rankings = await getRankings();
  try {
    fs.writeFileSync(filePath, JSON.stringify(rankings, null, 2), 'utf-8');
    console.log(`Rankings updated and saved at ${new Date().toLocaleTimeString()}`);
  } catch (err) {
    console.error('Error saving data:', err);
  }
}

setInterval(updateRankings, 15 * 60 * 1000);
updateRankings();

app.get('/rankings', async (req, res) => {
  try {
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Rankings file not found' });
    }
    const rankings = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(rankings);
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({ error: 'Failed to load rankings' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
