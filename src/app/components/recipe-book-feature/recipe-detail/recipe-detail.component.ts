import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe; //no longer using @Input this
  recipeId: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let recipes: Array<Recipe>;

    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id']
      this.recipe = this.recipeService.getSingleRecipe(this.recipeId);
    })
    // recipes = this.recipeService.getRecipes();
    // this.recipe = recipes[id];
    /*we left off here by updating the recipe detail with
     * the id loaded from the active route
    */
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.recipeId)
    this.router.navigate(['../'], { relativeTo: this.route })
  }

}
