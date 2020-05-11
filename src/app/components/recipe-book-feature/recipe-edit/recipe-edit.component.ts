import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';
import { formGroupNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']
      this.editMode = params['id'] != null //check if id present to determine edit vs new
      console.log(this.editMode);
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = ''
    let tempId;
    let recipeLoaded: Recipe
    let recipeIngredients = new FormArray([]);

    this.route.params.subscribe((params: Params) => {
      tempId = +params['id']
    })

    if (this.editMode) {

      recipeLoaded = this.recipeService.getSingleRecipe(tempId);
      console.log(recipeLoaded)


      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeLoaded.name, Validators.required),
        'imagePath': new FormControl(recipeLoaded.imagePath, Validators.required),
        'description': new FormControl(recipeLoaded.description, Validators.required),
        'ingredients': recipeIngredients
      })


      if (recipeLoaded['ingredients']) {
        for (let ingredient of recipeLoaded.ingredients) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }


    } else {
      //when we hit /new we initialize the form to be empty to 
      //prevent uninitialized form soft error
      this.recipeForm = new FormGroup({
        'name': new FormControl(),
        'imagePath': new FormControl(),
        'description': new FormControl(),
        'ingredients': recipeIngredients
      })
    }
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  onSubmit() {

    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);

    if (this.editMode) {
      //because our form has the same format as a recipe object, 
      //we can just pass in form.value
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }

    this.onCancel();

  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
