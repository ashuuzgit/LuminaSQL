const express = require('express');
const cors = require('cors');
require('dotenv').config();

const uploadRoute = require('./routes/upload');
const queryRoute = require('./routes/query');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', uploadRoute);
app.use('/api', queryRoute);

app.get('/', (req, res) => {
  res.json({ message: 'Text-to-SQL API is running' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});