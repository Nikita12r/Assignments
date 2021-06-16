const express = require('express');
const notesRouter = require('./api/routes');

const app = express();

app.use(express.json());
app.use('/', notesRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: "Notes Application!!"});
});

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Notes Server listening at http://localhost:${PORT}`);
});
