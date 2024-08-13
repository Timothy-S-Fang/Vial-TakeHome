const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const data = require('./MockDatabase/subjectData.json');

app.use(cors());

app.get('/api/subjects', (req,res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});