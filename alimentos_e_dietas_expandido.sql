
-- Inserção de alimentos adicionais
INSERT INTO alimentos (nome, grupo_alimentar, calorias, carboidratos, proteinas, gorduras) VALUES
-- Proteínas
('Atum', 'Proteína animal', 132, 0, 28, 1),
('Sardinha', 'Proteína animal', 208, 0, 25, 11),
('Carne bovina magra', 'Proteína animal', 250, 0, 26, 15),
('Tempeh', 'Proteína vegetal', 192, 9.4, 20, 11),
('Seitan', 'Proteína vegetal', 120, 4, 24, 1.5),

-- Gorduras boas
('Óleo de coco', 'Gorduras boas', 862, 0, 0, 100),
('Castanha-do-pará', 'Oleaginosas', 656, 12, 14, 66),
('Azeitonas', 'Gorduras boas', 115, 6, 0.8, 11),

-- Vegetais
('Abobrinha', 'Vegetais', 17, 3, 1.2, 0.3),
('Berinjela', 'Vegetais', 25, 6, 1, 0.2),
('Cenoura', 'Vegetais', 41, 10, 1, 0.2),
('Couve-flor', 'Vegetais', 25, 5, 2, 0.1),
('Espinafre', 'Vegetais', 23, 3.6, 2.9, 0.4),

-- Frutas
('Morango', 'Frutas', 32, 7.7, 0.7, 0.3),
('Maçã', 'Frutas', 52, 14, 0.3, 0.2),
('Banana', 'Frutas', 89, 23, 1.1, 0.3),
('Mirtilo', 'Frutas', 57, 14, 0.7, 0.3),

-- Grãos e cereais
('Quinoa', 'Grãos', 120, 21, 4.1, 1.9),
('Aveia', 'Grãos', 389, 66, 16.9, 6.9),
('Arroz integral', 'Grãos', 111, 23, 2.6, 0.9),
('Cevada', 'Grãos', 354, 73.5, 12.5, 2.3),

-- Leguminosas
('Grão-de-bico', 'Leguminosas', 164, 27, 9, 2.6),
('Ervilha', 'Leguminosas', 81, 14, 5, 0.4),
('Soja', 'Leguminosas', 446, 30, 36, 20),

-- Laticínios
('Iogurte natural', 'Laticínios', 63, 5, 5.3, 1.6),
('Leite vegetal (amêndoas)', 'Laticínios vegetais', 17, 1, 0.6, 1.2),
('Ricota', 'Laticínios', 174, 3, 11, 13);

-- Relacionamento com dietas
-- Ajuste os IDs conforme seu banco de dados
INSERT INTO alimento_dieta (alimento_id, dieta_id) VALUES
-- Mediterrânea
(16, 1), (17, 1), (18, 1), (25, 1), (28, 1), (30, 1), (34,1), (38,1), (40,1),
-- Low Carb
(16, 2), (17, 2), (18, 2), (19, 2), (21, 2), (24, 2), (26, 2), (27, 2), (29, 2), (36,2),
-- Cetogênica
(16, 3), (17, 3), (18, 3), (21, 3), (22, 3), (26, 3), (27, 3),
-- Vegetariana
(19, 4), (20, 4), (23, 4), (24, 4), (25, 4), (30, 4), (31, 4), (32,4), (33,4), (35,4), (39,4);
