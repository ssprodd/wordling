export function checkGuess(guess: string, target: string): string[] {
  const result: string[] = new Array(5).fill('wrong');
  const targetChars = target.split('');
  const guessChars = guess.split('');

  // Check for correct positions first
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] === targetChars[i]) {
      result[i] = 'correct';
      targetChars[i] = '*';
      guessChars[i] = '#';
    }
  }

  // Check for correct letters in wrong positions
  for (let i = 0; i < 5; i++) {
    if (guessChars[i] !== '#') {
      const targetIndex = targetChars.indexOf(guessChars[i]);
      if (targetIndex !== -1) {
        result[i] = 'present';
        targetChars[targetIndex] = '*';
      }
    }
  }

  return result;
}