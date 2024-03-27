// CommonJS syntax
// File: example.js
// const express = require('express');
// module.exports = express;

// ES module syntax
// File: example.ts
// import express from 'express';
// export default express;

const express = require('express');
const path = require('path');
const port = 3000;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
