import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors())
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

app.get('/api', (req, res) => {
    res.json({
        endpoints: [
            {
                method: "POST",
                path: "/api/imc",
                description: "Calculates BMI (Body Mass Index) and returns classification.",
                body: {
                    type: "application/json",
                    params: {
                        weight: "number (kg)",
                        height: "number (cm)"
                    }
                },
                response: {
                    type: "application/json",
                    body: {
                        imc: "number (calculated BMI)",
                        classification: "string (BMI classification)"
                    },
                    status: {
                        200: "Success. Returns imc and classification.",
                        400: "Bad Request. Invalid weight or height provided."
                    }
                }
            }
        ]
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

    if(bmi < 18.5) {
        return res.json({ imc: bmi, classification: "Abaixo do peso" });
    }

    if(bmi >= 18.5 && bmi < 24.9) {
        return res.json({ imc: bmi, classification: "Normal" });
    }
    
    if(bmi >= 25 && bmi < 29.9) {
        return res.json({ imc: bmi, classification: "Sobrepeso" });
    }

    if(bmi >= 30) {
        return res.json({ imc: bmi, classification: "Obeso" });
    }
})
  
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})