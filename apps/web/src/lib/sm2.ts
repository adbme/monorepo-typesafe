export type SM2Result = {
  interval: number;
  repetition: number;
  easeFactor: number;
  nextReview: number;
};

export function calculateSM2(
  quality: number, // 0 à 5
  repetition: number,
  previousInterval: number,
  previousEaseFactor: number
): SM2Result {
  let nextInterval: number;
  let nextEaseFactor = previousEaseFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  if (nextEaseFactor < 1.3) nextEaseFactor = 1.3;

  if (quality >= 3) {
    if (repetition === 0) {
      nextInterval = 1;
    } else if (repetition === 1) {
      nextInterval = 6;
    } else {
      nextInterval = Math.round(previousInterval * nextEaseFactor);
    }
    repetition += 1;
  } else {
    repetition = 0;
    nextInterval = 1;
  }

  return {
    interval: nextInterval,
    repetition,
    easeFactor: nextEaseFactor,
    nextReview: Date.now() + nextInterval * 24 * 60 * 60 * 1000,
  };
}