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

app.post('/api/tmb', (req, res) => {
    const { sexo, peso, altura, idade } = req.body;

    if (!sexo || isNaN(peso) || isNaN(altura) || isNaN(idade)) {
        return res.status(400).json({ erro: 'Dados inválidos ou incompletos.' });
    }

    let metabolismoBasal;

    if (sexo === 'masculino') {
        metabolismoBasal = 88.36 + (13.4 * peso) + (4.8 * altura) - (5.7 * idade);
    } else if (sexo === 'feminino') {
        metabolismoBasal = 447.6 + (9.2 * peso) + (3.1 * altura) - (4.3 * idade);
    } else {
        return res.status(400).json({ erro: 'Sexo inválido. Use "masculino" ou "feminino".' });
    }

    res.json({
        metabolismoBasal: Number(metabolismoBasal.toFixed(2)),
    });
});
  
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})