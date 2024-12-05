import { GridLayout, Property } from '@nativescript/core';

export class GameGrid extends GridLayout {
    public static guessesProperty = new Property<GameGrid, any[]>({
        name: 'guesses',
        defaultValue: []
    });

    guesses: any[];

    constructor() {
        super();
    }

    static register() {
        this.guessesProperty.register(GameGrid);
    }

    createNativeView() {
        return super.createNativeView();
    }
}