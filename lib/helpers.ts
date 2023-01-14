export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t
}

export const randomIntFromInterval = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}