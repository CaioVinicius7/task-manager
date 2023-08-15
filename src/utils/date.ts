export function startOfDay() {
  const startOfDay = new Date();

  startOfDay.setUTCHours(0, 0, 0, 0);

  return startOfDay;
}

export function endOfDay() {
  const endOfDay = new Date();

  endOfDay.setUTCHours(23, 59, 59, 999);

  return endOfDay;
}
