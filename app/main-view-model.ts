import { Observable } from '@nativescript/core';
import { getRandomWord } from './shared/word-list';
import { checkGuess } from './shared/game-utils';

interface TileLetter {
  letter: string;
  status: string;
}

export class WordleViewModel extends Observable {
  private targetWord: string;
  private currentGuess: string = '';
  private guessCount: number = 0;
  private _guesses: TileLetter[][] = [];
  private _gameStatus: string = 'Guess the 5-letter word!';
  private _keyboardStatus: { [key: string]: string } = {};
  private gameOver: boolean = false;

  constructor() {
    super();
    this.targetWord = getRandomWord().toUpperCase();
    console.log('Target word:', this.targetWord); // For debugging
    this.initializeGuesses();
    this.initializeKeyboard();
  }

  private initializeGuesses() {
    this._guesses = Array(6).fill(null).map(() =>
      Array(5).fill(null).map(() => ({ letter: '', status: 'empty' }))
    );
    this.notifyPropertyChange('guesses', this._guesses);
  }

  private initializeKeyboard() {
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(letter => {
      this._keyboardStatus[letter] = 'empty';
    });
    this.notifyPropertyChange('keyboardStatus', this._keyboardStatus);
  }

  get guesses(): TileLetter[][] {
    return this._guesses;
  }

  get gameStatus(): string {
    return this._gameStatus;
  }

  get keyboardStatus(): { [key: string]: string } {
    return this._keyboardStatus;
  }

  onKeyTap(args: any) {
    if (this.gameOver || this.currentGuess.length >= 5) return;
    
    const button = args.object;
    const letter = button.text;
    
    this.currentGuess += letter;
    const currentRow = this._guesses[this.guessCount];
    currentRow[this.currentGuess.length - 1].letter = letter;
    
    this.notifyPropertyChange('guesses', this._guesses);
  }

  onBackspace() {
    if (this.gameOver || this.currentGuess.length === 0) return;
    
    const currentRow = this._guesses[this.guessCount];
    currentRow[this.currentGuess.length - 1].letter = '';
    this.currentGuess = this.currentGuess.slice(0, -1);
    
    this.notifyPropertyChange('guesses', this._guesses);
  }

  onEnter() {
    if (this.gameOver || this.currentGuess.length !== 5) {
      if (this.currentGuess.length !== 5) {
        this._gameStatus = 'Word must be 5 letters!';
        this.notifyPropertyChange('gameStatus', this._gameStatus);
      }
      return;
    }

    const result = checkGuess(this.currentGuess.toUpperCase(), this.targetWord);
    const currentRow = this._guesses[this.guessCount];
    
    // Update tile status
    for (let i = 0; i < 5; i++) {
      currentRow[i].status = result[i];
      
      // Update keyboard status
      const letter = this.currentGuess[i].toUpperCase();
      if (result[i] === 'correct') {
        this._keyboardStatus[letter] = 'correct';
      } else if (result[i] === 'present' && this._keyboardStatus[letter] !== 'correct') {
        this._keyboardStatus[letter] = 'present';
      } else if (result[i] === 'wrong' && !['correct', 'present'].includes(this._keyboardStatus[letter])) {
        this._keyboardStatus[letter] = 'wrong';
      }
    }

    if (this.currentGuess.toUpperCase() === this.targetWord) {
      this._gameStatus = 'Congratulations! You won! 🎉';
      this.gameOver = true;
    } else if (this.guessCount === 5) {
      this._gameStatus = `Game Over! The word was ${this.targetWord}`;
      this.gameOver = true;
    } else {
      this._gameStatus = 'Keep guessing!';
      this.guessCount++;
    }

    this.currentGuess = '';
    
    this.notifyPropertyChange('guesses', this._guesses);
    this.notifyPropertyChange('gameStatus', this._gameStatus);
    this.notifyPropertyChange('keyboardStatus', this._keyboardStatus);
  }
}