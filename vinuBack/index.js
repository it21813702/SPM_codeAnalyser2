// server/index.js
const express = require('express');
const cors = require('cors'); // Importing the CORS package
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all requests
app.use(express.json());

app.post('/analyze', (req, res) => {
  const { code } = req.body;
  // Placeholder: analysis logic will go here
  res.json({ message: 'Code analyzed successfully', code });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
