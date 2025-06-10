-- Inserir receitas
INSERT INTO receitas (nome, modo_preparo, tempo_preparo, rendimento, dieta_id) VALUES
('Salada Mediterrânea', 'Misture azeite de oliva, tomates, pepino, cebola roxa e queijo feta. Sirva frio.', 15, 2, 1),
('Frango Low Carb com Legumes', 'Grelhe o frango e refogue brócolis, abobrinha e pimentão. Tempere a gosto.', 30, 3, 2),
('Omelete Cetogênica', 'Bata ovos com creme de leite e queijo. Cozinhe em frigideira com manteiga.', 10, 1, 3),
('Quiche Vegetariana', 'Prepare a massa, recheie com espinafre, ricota e ovos. Asse por 40 minutos.', 60, 4);

-- Inserir ingredientes da receita
INSERT INTO ingredientes_receita (receita_id, alimento_id, quantidade, unidade) VALUES
-- Salada Mediterrânea (id receita 1)
(1, 1, 3, 'colheres de sopa'), -- azeite de oliva
(1, 10, 100, 'g'), -- tomate (adapte conforme seu banco)
(1, 11, 100, 'g'), -- pepino
(1, 12, 50, 'g'),  -- cebola roxa
(1, 13, 50, 'g'),  -- queijo feta (adapte conforme necessário)

-- Frango Low Carb com Legumes (id receita 2)
(2, 15, 200, 'g'), -- peito de frango (adapte o id)
(2, 19, 150, 'g'), -- brócolis
(2, 9, 100, 'g'),  -- abobrinha
(2, 20, 100, 'g'), -- pimentão

-- Omelete Cetogênica (id receita 3)
(3, 5, 3, 'unidades'), -- ovos
(3, 6, 30, 'ml'),     -- creme de leite (adapte id)
(3, 7, 50, 'g'),      -- queijo (ex: mussarela, ricota)

-- Quiche Vegetariana (id receita 4)
(4, 5, 3, 'unidades'), -- ovos
(4, 14, 100, 'g'),    -- espinafre
(4, 13, 150, 'g');    -- ricota
