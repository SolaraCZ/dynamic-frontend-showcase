export function getAssetUrl(path) {
  return new URL(path, window.location.href).href;
}

export function shuffleArray(array) {
  const clone = [...array];
  for (let index = clone.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [clone[index], clone[swapIndex]] = [clone[swapIndex], clone[index]];
  }
  return clone;
}

export function shuffleInPlace(array) {
  const shuffled = shuffleArray(array);
  array.splice(0, array.length, ...shuffled);
}

export function shuffleGroupedIndices(groupCount, groupSize) {
  const groupOrder = shuffleArray(Array.from({ length: groupCount }, (_, index) => index));
  return groupOrder.flatMap((group) => {
    const members = Array.from({ length: groupSize }, (_, index) => group * groupSize + index);
    return shuffleArray(members);
  });
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date, days) {
  const copy = new Date(date);
  copy.setDate(copy.getDate() + days);
  return copy;
}

export function sameDay(left, right) {
  return left.getFullYear() === right.getFullYear()
    && left.getMonth() === right.getMonth()
    && left.getDate() === right.getDate();
}

export function drawUniqueNumbers(count, maxValue) {
  const pool = Array.from({ length: maxValue }, (_, index) => index + 1);
  return shuffleArray(pool).slice(0, count);
}