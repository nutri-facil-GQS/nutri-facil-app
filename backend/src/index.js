import express from 'express';

const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.json({
        version: "1.0.0",
        name: "nutri-facil-rest-api",
        status: "online",
        msg: "Welcome to the API! Use /api to access the endpoints."
    });
})
  
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})