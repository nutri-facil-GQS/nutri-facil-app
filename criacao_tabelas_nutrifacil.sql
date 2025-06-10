
-- Tabela de dietas
CREATE TABLE IF NOT EXISTS dietas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT
);

-- Tabela de alimentos
CREATE TABLE IF NOT EXISTS alimentos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    grupo_alimentar VARCHAR(100),
    calorias NUMERIC(6,2),
    carboidratos NUMERIC(6,2),
    proteinas NUMERIC(6,2),
    gorduras NUMERIC(6,2)
);

-- Tabela de relação entre alimentos e dietas
CREATE TABLE IF NOT EXISTS alimento_dieta (
    id SERIAL PRIMARY KEY,
    alimento_id INTEGER NOT NULL,
    dieta_id INTEGER NOT NULL,
    FOREIGN KEY (alimento_id) REFERENCES alimentos(id),
    FOREIGN KEY (dieta_id) REFERENCES dietas(id)
);

-- Tabela de receitas
CREATE TABLE IF NOT EXISTS receitas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    modo_preparo TEXT,
    tempo_preparo INTEGER,
    rendimento INTEGER,
    dieta_id INTEGER,
    FOREIGN KEY (dieta_id) REFERENCES dietas(id)
);

-- Tabela de ingredientes da receita
CREATE TABLE IF NOT EXISTS ingredientes_receita (
    id SERIAL PRIMARY KEY,
    receita_id INTEGER NOT NULL,
    alimento_id INTEGER NOT NULL,
    quantidade NUMERIC(6,2),
    unidade VARCHAR(50),
    FOREIGN KEY (receita_id) REFERENCES receitas(id),
    FOREIGN KEY (alimento_id) REFERENCES alimentos(id)
);
