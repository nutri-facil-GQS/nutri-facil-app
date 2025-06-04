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