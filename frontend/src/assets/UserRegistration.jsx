import React, { useState } from "react";

const DIETAS = ["Mediterrânea", "Low Carb", "Cetogênica", "Vegetariana"];
const SEXOS = ["Masculino", "Feminino"];
const OBJETIVOS = [
  "Emagrecimento (perda de gordura, redução de medidas, aumento de energia, etc.)",
  "Hipertrofia (ganho de massa, aumento de força, autoestima, etc.)"
];
const ALERGIAS = [
  "Lactose",
  "Glúten",
  "Proteína do leite",
  "Ovo",
  "Frutos do mar",
  "Nenhuma"
];

const PREFERENCIAS = ["Proteínas", "Legumes", "Verduras", "Carboidratos"];

export default function CadastroUsuario() {
  const [form, setForm] = useState({
    dieta: "",
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    preferencias: [],
    alergias: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "preferencias") {
        let newPrefs = [...form.preferencias];
        if (checked) {
          newPrefs.push(value);
        } else {
          newPrefs = newPrefs.filter((pref) => pref !== value);
        }
        setForm({ ...form, preferencias: newPrefs });
      } else if (name === "alergias") {
        let newAlergias = [...form.alergias];
        if (value === "Nenhuma") {
          // Se selecionar "Nenhuma", limpa outras alergias
          if (checked) newAlergias = ["Nenhuma"];
          else newAlergias = [];
        } else {
          // Se selecionar outra alergia, remove "Nenhuma"
          if (checked) {
            newAlergias = newAlergias.filter((a) => a !== "Nenhuma");
            newAlergias.push(value);
          } else {
            newAlergias = newAlergias.filter((a) => a !== value);
          }
        }
        setForm({ ...form, alergias: newAlergias });
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode validar e enviar os dados para o backend
    console.log("Dados enviados:", form);
    alert("Cadastro enviado! Veja no console os dados.");
  };

  return (
    <div style={{ maxWidth: 500, margin: "20px auto", fontFamily: "Arial" }}>
      <h2>Cadastro de Usuário</h2>
      <form onSubmit={handleSubmit}>
        {/* Dieta */}
        <label>Dieta:</label>
        <select name="dieta" value={form.dieta} onChange={handleChange} required>
          <option value="">-- Selecione --</option>
          {DIETAS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        {/* Peso */}
        <label>Peso (kg):</label>
        <input
          type="number"
          name="peso"
          min="1"
          value={form.peso}
          onChange={handleChange}
          required
        />

        {/* Altura */}
        <label>Altura (cm):</label>
        <input
          type="number"
          name="altura"
          min="1"
          value={form.altura}
          onChange={handleChange}
          required
        />

        {/* Idade */}
        <label>Idade (anos):</label>
        <input
          type="number"
          name="idade"
          min="1"
          value={form.idade}
          onChange={handleChange}
          required
        />

        {/* Sexo */}
        <label>Sexo:</label>
        <select name="sexo" value={form.sexo} onChange={handleChange} required>
          <option value="">-- Selecione --</option>
          {SEXOS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Objetivo */}
        <label>Objetivo:</label>
        <select name="objetivo" value={form.objetivo} onChange={handleChange} required>
          <option value="">-- Selecione --</option>
          {OBJETIVOS.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
        </select>

        {/* Preferência de alimentos */}
        <fieldset>
          <legend>Preferência de Alimentos (por categoria)</legend>
          {PREFERENCIAS.map((p) => (
            <label key={p} style={{ display: "block" }}>
              <input
                type="checkbox"
                name="preferencias"
                value={p}
                checked={form.preferencias.includes(p)}
                onChange={handleChange}
              />
              {p}
            </label>
          ))}
        </fieldset>

        {/* Alergias / Intolerâncias */}
        <fieldset>
          <legend>Alergias / Intolerâncias</legend>
          {ALERGIAS.map((a) => (
            <label key={a} style={{ display: "block" }}>
              <input
                type="checkbox"
                name="alergias"
                value={a}
                checked={form.alergias.includes(a)}
                onChange={handleChange}
              />
              {a}
            </label>
          ))}
        </fieldset>

        <button type="submit" style={{ marginTop: 15 }}>
          Cadastrar
        </button>
      </form>
    </div>
  );
}
