

export function getRandomInt(min: number, max: number): number {
  // Ensure min is less than or equal to max
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random integer between min (inclusive) and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
}