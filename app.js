const express = require('express');
const app = express();
const port = 4000;

app.use(express.static(__dirname)); // Serve files from the current directory

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
