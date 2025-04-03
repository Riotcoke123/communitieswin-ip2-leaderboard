<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    
</head>
<body>
    <h1>Communities.win/IP2 Leaderboard</h1>
    <p>This project fetches and displays the leaderboard for the <a href="https://communities.win/" target="_blank">Communities.win</a> / IP2 community. It retrieves data from the <code>newv2.json</code> API, processes the rankings, and provides an endpoint to retrieve these rankings in JSON format.</p>
    <h2>Features</h2>
    <ul>
        <li>Fetches and processes post data from the IP2Always community on <a href="https://communities.win/" target="_blank">Communities.win</a>.</li>
        <li>Calculates the user score by multiplying upvotes by 120.</li>
        <li>Ranks users based on their scores.</li>
        <li>Exposes an API to retrieve the latest rankings in JSON format.</li>
        <li>Automatically updates rankings every 15 minutes and stores them in a local JSON file.</li>
    </ul>
    <h2>Installation</h2>
    <p>To run this project locally, you need to have Node.js installed.</p>
    <h3>Steps to Run:</h3>
    <ol>
        <li>Clone the repository:
            <pre><code>git clone https://github.com/Riotcoke123/communitieswin-ip2-leaderboard.git</code></pre>
            <pre><code>cd communitieswin-ip2-leaderboard</code></pre>
        </li>
        <li>Install dependencies:
            <pre><code>npm install</code></pre>
        </li>
        <li>Create a <code>.env</code> file at the root of the project and define the following environment variables:
            <pre><code>API_ACCEPT=application/json, text/plain, */*</code></pre>
            <pre><code>API_ACCEPT_ENCODING=gzip, deflate, br, zstd</code></pre>
            <pre><code>API_ACCEPT_LANGUAGE=en-US,en;q=0.9</code></pre>
            <pre><code>API_PRIORITY=u=1, i</code></pre>
            <pre><code>API_REFERER=https://communities.win/c/IP2Always/new</code></pre>
            <pre><code>API_SEC_CH_UA="Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"</code></pre>
            <pre><code>API_SEC_CH_UA_MOBILE=?0</code></pre>
            <pre><code>API_SEC_CH_UA_PLATFORM="Windows"</code></pre>
            <pre><code>API_SEC_FETCH_DEST=empty</code></pre>
            <pre><code>API_SEC_FETCH_MODE=cors</code></pre>
            <pre><code>API_SEC_FETCH_SITE=same-origin</code></pre>
            <pre><code>API_USER_AGENT=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36</code></pre>
            <pre><code>API_KEY=&lt;your-api-key&gt;</code></pre>
            <pre><code>API_PLATFORM=Scored-Desktop</code></pre>
            <pre><code>API_SECRET=&lt;your-api-secret&gt;</code></pre>
            <pre><code>API_XSRF_TOKEN=&lt;your-xsrf-token&gt;</code></pre>
        </li>
        <li>Start the server:
            <pre><code>npm start</code></pre>
        </li>
    </ol>
    <p>The server will be running on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>.</p>
    <h2>API Endpoints</h2>
    <h3>Get Rankings</h3>
    <p><strong>GET /rankings</strong></p>
    <p>Returns the leaderboard rankings in JSON format.</p>
    <h3>Example Response:</h3>
    <pre><code>[
    {
        "rank": 1,
        "username": "user1",
        "score": 14400,
        "profileLink": "https://communities.win/u/user1"
    },
    {
        "rank": 2,
        "username": "user2",
        "score": 12000,
        "profileLink": "https://communities.win/u/user2"
    }
]</code></pre>
    <h2>License</h2>
    <p>This project is licensed under the <a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank">GNU General Public License (GPL)</a>. See <a href="LICENSE" target="_blank">LICENSE</a> for more details.</p>
    <h2>Acknowledgements</h2>
    <ul>
        <li>The project utilizes the <a href="https://docs.scored.co/" target="_blank">Communities.win API</a> for fetching posts and user information.</li>
        <li>This project is built with <a href="https://nodejs.org/" target="_blank">Node.js</a> and <a href="https://expressjs.com/" target="_blank">Express</a>.</li>
    </ul>
    <h2>Contributing</h2>
    <p>If you'd like to contribute, feel free to fork the repository, create a new branch, and submit a pull request.</p>

</body>
</html>

