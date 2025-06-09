import React, { useState } from "react";
import { z } from "zod";

const SEXOS = ["Masculino", "Feminino"];
const ALERGIAS = [
  "Lactose",
  "Glúten",
  "Proteína do leite",
  "Ovo",
  "Frutos do mar",
  "Nenhuma"
];
const PREFERENCIAS = ["Proteínas", "Legumes", "Verduras", "Carboidratos"];

function CadastrarDieta() {
  const [dietas, setDietas] = useState([]);
  const [objetivos, setObjetivos] = useState([]);
  const [form, setForm] = useState({
    email: "",
    dieta: "",
    peso: "",
    altura: "",
    idade: "",
    sexo: "",
    objetivo: "",
    preferencias: [],
    alergias: [],
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    fetch('http://localhost:3000/api/dietas')
      .then(res => res.json())
      .then(data => setDietas(data.map(d => d.NOME)));

    fetch('http://localhost:3000/api/objetivos')
      .then(res => res.json())
      .then(data => setObjetivos(data.map(o => o.NOME)));
  }, []);

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
          newAlergias = checked ? ["Nenhuma"] : [];
        } else {
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
    setErrors({});
    setSuccess(false);
  };

  const dietaSchema = z.object({
    email: z.string().email("Email inválido"),
    dieta: z.string().min(1, "Selecione uma dieta"),
    peso: z.number({ invalid_type_error: "Peso deve ser um número" }).min(1, "Peso deve ser maior que zero"),
    altura: z.number({ invalid_type_error: "Altura deve ser um número" }).min(1, "Altura deve ser maior que zero"),
    idade: z.number({ invalid_type_error: "Idade deve ser um número" }).min(1, "Idade deve ser maior que zero"),
    sexo: z.string().min(1, "Selecione o sexo"),
    objetivo: z.string().min(1, "Selecione o objetivo"),
    preferencias: z.array(z.string()),
    alergias: z.array(z.string()),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    // Conversão de campos numéricos
    const parsedForm = {
      ...form,
      peso: Number(form.peso),
      altura: Number(form.altura),
      idade: Number(form.idade),
    };

    const result = dietaSchema.safeParse(parsedForm);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // ENVIA OS DADOS PARA O BACKEND
    try {
      const response = await fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedForm),
      });

      if (response.ok) {
        setErrors({}); // Limpa os erros ao ter sucesso!
        setSuccess(true);
        setForm({
          email: "",
          dieta: "",
          peso: "",
          altura: "",
          idade: "",
          sexo: "",
          objetivo: "",
          preferencias: [],
          alergias: [],
        });
      } else {
        const data = await response.json();
        setErrors({ submit: data.error || "Erro ao cadastrar" });
      }
    } catch (err) {
      setErrors({ submit: "Erro de conexão com o servidor" });
    }
  };

  return (
    <div className="container px-4 py-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">Cadastro de Dieta</h2>
      <form onSubmit={handleSubmit}>
        {/* Campo de email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        {/* Campo de senha removido */}
        {/* Demais campos do formulário */}
        <div className="mb-3">
          <label className="form-label">Dieta</label>
          <select
            className={`form-control ${errors.dieta ? "is-invalid" : ""}`}
            name="dieta"
            value={form.dieta}
            onChange={handleChange}
          >
            <option value="">-- Selecione --</option>
            {dietas.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          {errors.dieta && <div className="invalid-feedback">{errors.dieta}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Peso (kg)</label>
          <input
            type="number"
            className={`form-control ${errors.peso ? "is-invalid" : ""}`}
            name="peso"
            value={form.peso}
            onChange={handleChange}
            min="1"
          />
          {errors.peso && <div className="invalid-feedback">{errors.peso}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Altura (cm)</label>
          <input
            type="number"
            className={`form-control ${errors.altura ? "is-invalid" : ""}`}
            name="altura"
            value={form.altura}
            onChange={handleChange}
            min="1"
          />
          {errors.altura && <div className="invalid-feedback">{errors.altura}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Idade (anos)</label>
          <input
            type="number"
            className={`form-control ${errors.idade ? "is-invalid" : ""}`}
            name="idade"
            value={form.idade}
            onChange={handleChange}
            min="1"
          />
          {errors.idade && <div className="invalid-feedback">{errors.idade}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Sexo</label>
          <select
            className={`form-control ${errors.sexo ? "is-invalid" : ""}`}
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
          >
            <option value="">-- Selecione --</option>
            {SEXOS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.sexo && <div className="invalid-feedback">{errors.sexo}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Objetivo</label>
          <select
            className={`form-control ${errors.objetivo ? "is-invalid" : ""}`}
            name="objetivo"
            value={form.objetivo}
            onChange={handleChange}
          >
            <option value="">-- Selecione --</option>
            {objetivos.map((o, i) => (
              <option key={i} value={o}>{o}</option>
            ))}
          </select>
          {errors.objetivo && <div className="invalid-feedback">{errors.objetivo}</div>}
        </div>
        <fieldset className="mb-3">
          <legend>Preferência de Alimentos</legend>
          {PREFERENCIAS.map((p) => (
            <div className="form-check" key={p}>
              <input
                className="form-check-input"
                type="checkbox"
                name="preferencias"
                value={p}
                checked={form.preferencias.includes(p)}
                onChange={handleChange}
                id={`pref-${p}`}
              />
              <label className="form-check-label" htmlFor={`pref-${p}`}>
                {p}
              </label>
            </div>
          ))}
        </fieldset>
        <fieldset className="mb-3">
          <legend>Alergias / Intolerâncias</legend>
          {ALERGIAS.map((a) => (
            <div className="form-check" key={a}>
              <input
                className="form-check-input"
                type="checkbox"
                name="alergias"
                value={a}
                checked={form.alergias.includes(a)}
                onChange={handleChange}
                id={`alergia-${a}`}
              />
              <label className="form-check-label" htmlFor={`alergia-${a}`}>
                {a}
              </label>
            </div>
          ))}
        </fieldset>
        <button type="submit" className="btn btn-primary">Cadastrar</button>
        {success && <div className="alert alert-success mt-3">Cadastro enviado com sucesso!</div>}
        {errors.submit && <div className="alert alert-danger mt-3">{errors.submit}</div>}
      </form>
    </div>
  );
}

export default CadastrarDieta;