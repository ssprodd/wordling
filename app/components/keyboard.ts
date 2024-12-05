import { GridLayout, Property } from '@nativescript/core';

export class Keyboard extends GridLayout {
    public static keyboardStatusProperty = new Property<Keyboard, any>({
        name: 'keyboardStatus',
        defaultValue: {}
    });

    keyboardStatus: any;

    constructor() {
        super();
    }

    static register() {
        this.keyboardStatusProperty.register(Keyboard);
    }

    createNativeView() {
        return super.createNativeView();
    }
}