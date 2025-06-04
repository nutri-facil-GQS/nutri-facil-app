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
    email, senha, dieta, peso, altura, idade, sexo,
    objetivo, preferencias, alergias
  } = req.body;

  const ID_USUARIO = randomUUID();

  try {
    await db.run(
      `INSERT INTO USUARIO (ID_USUARIO, EMAIL, SENHA) VALUES (?, ?, ?)`,
      [ID_USUARIO, email, senha]
    );

    const dietaRow = await db.get(`SELECT ID_DIETA FROM DIETA WHERE NOME = ?`, [dieta]);
    const objetivoRow = await db.get(`SELECT ID_OBJETIVO FROM OBJETIVO WHERE NOME = ?`, [objetivo]);

    if (!dietaRow || !objetivoRow) {
      return res.status(400).json({ error: "Dieta ou Objetivo inválido." });
    }

    const result = await db.run(
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
        preferencias.join(','),
        "Plano Personalizado"
      ]
    );

    const ID_DIETA_USUARIO = result.lastID;

    for (const alergiaNome of alergias) {
      const alergiaRow = await db.get(`SELECT ID_ALERGIA FROM ALERGIAS WHERE NOME = ?`, [alergiaNome]);
      if (alergiaRow) {
        await db.run(
          `INSERT INTO DIETA_ALERGIAS (ID_DIETA_USUARIO, ID_ALERGIA) VALUES (?, ?)`,
          [ID_DIETA_USUARIO, alergiaRow.ID_ALERGIA]
        );
      }
    }

    res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
