import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-container',
  templateUrl: './shopping-list-container.component.html',
  styleUrls: ['./shopping-list-container.component.css']
})
export class ShoppingListContainerComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  ingredientChangeSub: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }

  // onAddIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }

}
