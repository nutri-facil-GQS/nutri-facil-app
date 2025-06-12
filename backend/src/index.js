import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const dbPromise = open({
  filename: './Db/Nutri_Facil.db',
  driver: sqlite3.Database
});

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


app.post('/api/cadastro', async (req, res) => {
  const db = await dbPromise;
  const {
    email, // senha removida
    dieta, peso, altura, idade, sexo,
    objetivo, preferencias, alergias
  } = req.body;

  const ID_USUARIO = randomUUID();

  try {
    await db.run(
      `INSERT INTO USUARIO (ID_USUARIO, EMAIL, SENHA) VALUES (?, ?, ?)`,
      [ID_USUARIO, email, null]
    );

    const dietaRow = await db.get(`SELECT ID_DIETA FROM DIETA WHERE NOME = ?`, [dieta]);
    const objetivoRow = await db.get(`SELECT ID_OBJETIVO FROM OBJETIVO WHERE NOME = ?`, [objetivo]);

    if (!dietaRow || !objetivoRow) {
      return res.status(400).json({ error: "Dieta ou Objetivo inválido." });
    }

    const preferenciasStr = [...preferencias].join(';');
    const alergiasStr = [...alergias].join(';');

    await db.run(
      `INSERT INTO DIETA_USUARIO (
        ID_USUARIO, ID_DIETA, PESO, ALTURA, IDADE, SEXO,
        ID_OBJETIVO, PREFERENCIAS, ALERGIAS, NOME_PERSOLIZADO
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ID_USUARIO,
        dietaRow.ID_DIETA,
        peso,
        altura,
        idade,
        sexo,
        objetivoRow.ID_OBJETIVO,
        preferenciasStr,
        alergiasStr,
        "Plano Personalizado"
      ]
    );
    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.get('/api/dietas', async (req, res) => {
  try {
    const db = await dbPromise;
    const dietas = await db.all('SELECT NOME FROM DIETA');
    res.json(dietas);
  } catch (error) {
    console.error("Erro ao buscar dietas:", error);
    res.status(500).json({ error: "Erro ao buscar dietas" });
  }
});

app.get('/api/objetivos', async (req, res) => {
  try {
    const db = await dbPromise;
    const objetivos = await db.all('SELECT NOME FROM OBJETIVO');
    res.json(objetivos);
  } catch (error) {
    console.error("Erro ao buscar objetivos:", error);
    res.status(500).json({ error: "Erro ao buscar objetivos" });
  }
});

app.get('/api/dietas-usuarios', async (req, res) => {
  try {
    const db = await dbPromise;
    const dietasUsuarios = await db.all(`
      SELECT 
        ID_DIETA_USUARIO         AS idDietaUsuario,
        DU.ID_USUARIO            AS idUsuario,
        D.NOME                   AS nomeDieta,
        PESO                     AS peso,
        ALTURA                   AS altura,
        IDADE                    AS idade,
        SEXO                     AS sexo,
        O.NOME                   AS objetivo,
        PREFERENCIAS             AS preferencias,
        ALERGIAS                 AS alergias,
        NOME_PERSOLIZADO         AS nomePersolizado,
        U.EMAIL                  AS emailUsuario
      FROM DIETA_USUARIO AS DU
      INNER JOIN USUARIO AS U ON DU.ID_USUARIO = U.ID_USUARIO
      LEFT JOIN DIETA AS D ON DU.ID_DIETA = D.ID_DIETA
      LEFT JOIN OBJETIVO AS O ON DU.ID_OBJETIVO = O.ID_OBJETIVO
    `);
    res.json(dietasUsuarios);
  } catch (error) {
    console.error("Erro ao buscar dietas dos usuários:", error);
    res.status(500).json({ error: "Erro ao buscar dietas dos usuários" });
  }
});
  
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})
