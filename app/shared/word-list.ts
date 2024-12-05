// List of 5-letter words for the game
export const WORD_LIST = [
  'APPLE', 'BEACH', 'CHAIR', 'DANCE', 'EAGLE', 'FLAME', 'GRAPE', 'HOUSE',
  'IMAGE', 'JUICE', 'KNIFE', 'LEMON', 'MOUSE', 'NIGHT', 'OCEAN', 'PIANO',
  'QUEEN', 'RADIO', 'SNAKE', 'TABLE', 'UNCLE', 'VOICE', 'WATER', 'YOUTH'
];

export function getRandomWord(): string {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
}