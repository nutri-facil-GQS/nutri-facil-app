import React, { useState, useEffect } from 'react';

const WaterTracker = () => {
  const [intake, setIntake] = useState(0);
  const [goal, setGoal] = useState(2000);

  const addIntake = (amount) => {
    setIntake(prev => prev + amount);
  };

  return (
    <div>
      <h2>Controle de Ingestão de Água</h2>
      <p>Meta: {goal} ml</p>
      <p>Ingerido: {intake} ml</p>
      <button onClick={() => addIntake(250)}>+250ml</button>
      <button onClick={() => addIntake(500)}>+500ml</button>
      <div style={{ marginTop: '1em', height: '20px', width: '100%', background: '#ccc' }}>
        <div style={{ height: '100%', width: `${(intake / goal) * 100}%`, background: 'blue' }}></div>
      </div>
    </div>
  );
};

export default WaterTracker;