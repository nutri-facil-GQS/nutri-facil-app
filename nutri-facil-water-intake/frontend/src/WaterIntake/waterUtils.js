export function calculateWaterGoal(weight, activity) {
  let multiplier = 35;
  if (activity === 'ativo') multiplier = 40;
  else if (activity === 'muito_ativo') multiplier = 47.5;

  return weight * multiplier;
}