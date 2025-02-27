const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});

app.get('/api/info', (req, res) => {
  res.json({
    name: 'Express API',
    version: '1.0.0',
    nodeVersion: process.versions.node
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(PORT)
  console.log(`Server  on http://localhost:${PORT} 899`);
});