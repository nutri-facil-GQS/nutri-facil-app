import React, { useState } from 'react';
import { z } from 'zod';

const imcSchema = z.object({
  weight: z.string().min(1, 'Peso é obrigatório')
    .transform(val => Number(val))
    .refine(val => val > 0 && val <= 300, 'Peso deve estar entre 0 e 300 kg'),
  height: z.string().min(1, 'Altura é obrigatória')
    .transform(val => Number(val))
    .refine(val => val > 0 && val <= 3, 'Altura deve estar entre 0 e 3 metros')
});

function Imc() {
  const [formData, setFormData] = useState({ weight: '', height: '' });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setResult(null);

    try {
      const validatedData = imcSchema.parse(formData);
      setLoading(true);

      const response = await fetch('http://localhost:3000/api/imc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          weight: Number(validatedData.weight.toFixed(2)), // Ensure two decimal places
          height: Number((validatedData.height.toFixed(2) * 100).toFixed(2)), // Convert meters to centimeters
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setResult(data);
      } else {
        setErrors({ api: data.error || 'Erro ao calcular IMC' });
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach(error => {
          fieldErrors[error.path[0]] = error.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ api: 'Erro ao conectar com o servidor' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Calculadora de IMC</h2>
          
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">Peso (kg)</label>
              <input
                type="number"
                className={`form-control ${errors.weight ? 'is-invalid' : ''}`}
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Ex: 70.5"
                step="0.1"
              />
              {errors.weight && (
                <div className="invalid-feedback">{errors.weight}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="height" className="form-label">Altura (metros)</label>
              <input
                type="number"
                className={`form-control ${errors.height ? 'is-invalid' : ''}`}
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="Ex: 1.70"
                step="0.01"
              />
              {errors.height && (
                <div className="invalid-feedback">{errors.height}</div>
              )}
            </div>

            <button 
              type="submit" 
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? 'Calculando...' : 'Calcular IMC'}
            </button>
          </form>

          {errors.api && (
            <div className="alert alert-danger mt-3">{errors.api}</div>
          )}

          {result && (
            <div className="alert alert-info mt-3">
              <h4 className="alert-heading">Resultado</h4>
              <p className="mb-0">IMC: {result.imc}</p>
              <p className="mb-0">Classificação: {result.classification}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Imc;