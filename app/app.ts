import { Application } from '@nativescript/core';
import { GameGrid } from './components/game-grid';
import { Keyboard } from './components/keyboard';

// Register custom components
GameGrid.register();
Keyboard.register();

Application.run({ moduleName: 'app-root' });