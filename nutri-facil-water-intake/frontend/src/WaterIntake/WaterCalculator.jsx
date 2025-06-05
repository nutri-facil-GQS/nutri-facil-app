import React, { useState } from 'react';

const WaterCalculator = () => {
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState('');
  const [activity, setActivity] = useState('sedentario');
  const [waterGoal, setWaterGoal] = useState(null);

  const calculateWaterIntake = () => {
    let multiplier = 35;
    if (activity === 'ativo') multiplier = 40;
    else if (activity === 'muito_ativo') multiplier = 47.5;

    const goal = weight * multiplier;
    setWaterGoal(goal);
  };

  return (
    <div>
      <h2>Calculadora de Ingestão de Água</h2>
      <input type="number" placeholder="Peso (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
      <input type="number" placeholder="Idade" value={age} onChange={e => setAge(e.target.value)} />
      <select value={activity} onChange={e => setActivity(e.target.value)}>
        <option value="sedentario">Sedentário</option>
        <option value="ativo">Ativo</option>
        <option value="muito_ativo">Muito Ativo</option>
      </select>
      <button onClick={calculateWaterIntake}>Calcular Meta</button>
      {waterGoal && <p>Meta diária: {waterGoal.toFixed(0)} ml</p>}
    </div>
  );
};

export default WaterCalculator;