// This file serves as an entry point for Vercel deployment
const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the src directory
app.use(express.static(path.join(__dirname, 'src')));

// Redirect all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

// Export the Express app for Vercel serverless deployment
module.exports = app;

// Start the server if running locally
if (require.main === module) {
  const PORT = process.env.PORT || 4200;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} 