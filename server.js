const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// Redirect all requests to index.html for routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Start the server
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view your app`);
}); 