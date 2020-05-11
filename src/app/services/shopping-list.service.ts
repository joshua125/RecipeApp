import { Ingredient } from '../models/Ingredient.model';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingListService {

    // ingredientsChanged = new EventEmitter<Ingredient[]>(); emitter have been replaced with subjects for cross component communication. More control
    ingredientsChanged = new Subject<Ingredient[]>();
    shoppingListEditable = new Subject<number>();

    private ingredients: Ingredient[] = [
        new Ingredient('PB&J', 2),
        new Ingredient('almond milk', 2),
        new Ingredient('Pepper', 1)
    ];

    constructor() { }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addAllIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    updateIngredient(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice())
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}