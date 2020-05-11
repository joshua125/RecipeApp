import { Recipe } from '../models/recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../models/Ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[] = [
        new Recipe('Ramen', 'A Bowl of savory Miso ramen', '../../../../assets/shared/noodles.jpg',
            [
                new Ingredient('Onions', 2),
                new Ingredient('noodles', 100),
                new Ingredient('broth', 1)
            ]),
        new Recipe('A Test Recipe', 'simply a test', '../../../../assets/shared/noodles.jpg',
            [
                new Ingredient('Butter', 2),
                new Ingredient('Eggs', 100),
                new Ingredient('Cheese', 1)
            ]),
        new Recipe('Spaghetti', 'simply a test', '../../../../assets/shared/noodles.jpg',
            [
                new Ingredient('Sausage', 2),
                new Ingredient('tomatoes', 100),
                new Ingredient('chives', 1)
            ])
    ];

    // recipeSelected = new EventEmitter<Recipe>(); replaced with subject
    //recipeSelected = new Subject<Recipe>(); this isn't being used and has been replaced with routing previously was how we loaded selected recipes

    constructor(private shoppingListService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    getSingleRecipe(index: number) {
        return this.recipes[index];
    }

    addRecipe(newRecipe: Recipe) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, editedRecipe: Recipe) {
        this.recipes[index] = editedRecipe;
        this.recipesChanged.next(this.recipes.slice());
        console.log('index: \n' + index + " Recipe: \n" + editedRecipe)
    }

    addIngredientsToShoppingList(Ingredient: Ingredient[]) {
        this.shoppingListService.addAllIngredients(Ingredient);
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}