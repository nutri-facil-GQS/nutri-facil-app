const express = require('express');
const app = express();
const port = 3001;
const waterRoutes = require('./routes');

app.use(express.json());
app.use('/water-intake', waterRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});