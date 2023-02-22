export const lerp = (start, end, t) => {
  return start * (1 - t) + end * t
}

export const randomIntFromInterval = (min = 0, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const calculateIndex = ({ scroll, offset, wrapWidth, containerIndex, itemWidth, gutter }) => {
  return scroll - offset <= 0
    ? Math.floor(-1 * (wrapWidth - (wrapWidth - ((scroll + (Math.abs(wrapWidth) * containerIndex)) - offset))) / (itemWidth + gutter))
    : Math.floor((wrapWidth - (wrapWidth - ((Math.abs(wrapWidth) * containerIndex) - scroll) - offset)) / (itemWidth + gutter));
}