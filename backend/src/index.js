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

app.post('/api/imc', (req, res) => {
    const { weight, height } = req.body;

    if(weight === undefined || height === undefined) {
        return res.status(400).json({ error: "Weight and height are required." });
    }

    if (isNaN(weight) ||  isNaN(height) || weight <= 0 || height <= 0) {
        return res.status(400).json({ error: "Invalid weight or height provided." });
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    // Body Mass Index (BMI) calculation
    const bmi = Number((weightNum / Math.pow((heightNum / 100), 2)).toFixed(2));

    console.log(`Calculated BMI: ${bmi} for weight: ${weightNum} kg and height: ${heightNum} cm`);

    if(bmi < 18.5) {
        return res.json({ bmi: bmi, classification: "Underweight" });
    }

    if(bmi >= 18.5 && bmi < 24.9) {
        return res.json({ bmi: bmi, classification: "Normal weight" });
    }
    
    if(bmi >= 25 && bmi < 29.9) {
        return res.json({ bmi: bmi, classification: "Overweight" });
    }

    if(bmi >= 30) {
        return res.json({ bmi: bmi, classification: "Obesity" });
    }
})

app.post('/api/water', (req, res) => {
    const { weight } = req.body;

    if(weight === undefined) {
        return res.status(400).json({ error: "Weight is required." });
    }

    if (isNaN(weight) || weight <= 0) {
        return res.status(400).json({ error: "Invalid weight provided." });
    }

    const calc = (35 * weight);

    res.status(200).json({
        result: calc,
    })
})
  
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})