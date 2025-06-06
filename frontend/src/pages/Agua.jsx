import { useState } from 'react';
import { z } from 'zod';

const waterSchema = z.object({
  weight: z.number().min(20).max(300)
});

export default function WaterCalculator() {
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const parsed = waterSchema.parse({ weight: Number(weight) });
      
      const response = await fetch('http://localhost:3000/api/water', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ weight: parsed.weight })
      });

      if (!response.ok) {
        throw new Error('Erro na requisição');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        setError('Por favor, insira um peso válido entre 20 e 300 kg');
      } else {
        setError('Erro ao calcular. Tente novamente.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Calculadora de Água Diária</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="weight" className="form-label">
                Seu peso (kg)
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Ex: 70"
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
                {result.message || `Você deve beber ${result.result}ml de água por dia`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}