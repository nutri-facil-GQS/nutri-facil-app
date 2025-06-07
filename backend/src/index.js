import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { randomUUID } from 'crypto';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbPromise = open({
  filename: './Db/Nutri_Facil.db',
  driver: sqlite3.Database
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
    // Não criptografa mais senha, salva apenas email
    await db.run(
      `INSERT INTO USUARIO (ID_USUARIO, EMAIL) VALUES (?, ?)`,
      [ID_USUARIO, email]
    );

    const dietaRow = await db.get(`SELECT ID_DIETA FROM DIETA WHERE NOME = ?`, [dieta]);
    const objetivoRow = await db.get(`SELECT ID_OBJETIVO FROM OBJETIVO WHERE NOME = ?`, [objetivo]);

    if (!dietaRow || !objetivoRow) {
      return res.status(400).json({ error: "Dieta ou Objetivo inválido." });
    }

    const preferenciasEAlergias = [...preferencias, ...alergias].join(';');

    await db.run(
      `INSERT INTO DIETA_USUARIO (
        ID_USUARIO, ID_DIETA, PESO, ALTURA, IDADE, SEXO,
        ID_OBJETIVO, ID_PREFERENCIA, NOME_PERSOLIZADO
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ID_USUARIO,
        dietaRow.ID_DIETA,
        peso,
        altura,
        idade,
        sexo,
        objetivoRow.ID_OBJETIVO,
        preferenciasEAlergias,
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

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
