import { useState } from 'react';
import { z } from 'zod';

const tmbSchema = z.object({
  sexo: z.enum(['masculino', 'feminino']),
  peso: z.number().min(30).max(300),
  altura: z.number().min(100).max(250),
  idade: z.number().min(1).max(120)
});

export default function TmbCalculator() {
  const [formData, setFormData] = useState({
    sexo: 'masculino',
    peso: '',
    altura: '',
    idade: ''
  });
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = tmbSchema.parse({
        ...formData,
        peso: Number(formData.peso),
        altura: Number(formData.altura),
        idade: Number(formData.idade)
      });
      
      const response = await fetch('http://localhost:3000/api/tmb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsed)
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError('Por favor, preencha todos os campos corretamente');
      } else {
        setError('Erro ao calcular. Tente novamente.');
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Calculadora de TMB</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Sexo</label>
              <select
                name="sexo"
                className="form-select"
                value={formData.sexo}
                onChange={handleChange}
              >
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="peso" className="form-label">
                Peso (kg)
              </label>
              <input
                type="number"
                className="form-control"
                id="peso"
                name="peso"
                value={formData.peso}
                onChange={handleChange}
                placeholder="Ex: 70"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="altura" className="form-label">
                Altura (cm)
              </label>
              <input
                type="number"
                className="form-control"
                id="altura"
                name="altura"
                value={formData.altura}
                onChange={handleChange}
                placeholder="Ex: 170"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="idade" className="form-label">
                Idade (anos)
              </label>
              <input
                type="number"
                className="form-control"
                id="idade"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                placeholder="Ex: 30"
              />
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100"
            >
              Calcular
            </button>
          </form>

          {result && (
            <div className="alert alert-info mt-4" role="alert">
              <h4 className="alert-heading">Resultado:</h4>
              <p className="mb-0">
                Sua Taxa Metabólica Basal é: {result.metabolismoBasal} calorias/dia
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}