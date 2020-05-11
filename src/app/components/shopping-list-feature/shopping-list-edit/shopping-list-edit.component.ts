import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {

  // @ViewChild('nameInput') nameInputref: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  @Output() ingredientAdded = new EventEmitter<Ingredient>()
  @ViewChild('f') shoppingListForm: NgForm;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  //@ViewChild('serverComponent', {static: true}) serverContentInput: ElementRef;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.shoppingListEditable.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;

        this.editedItem = this.shoppingListService.getIngredient(index);

        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  onAddItem(f: NgForm) {
    // const ingredientName = this.nameInputref.nativeElement.value;
    // const ingredientAmount = this.amountInputRef.nativeElement.value;
    const value = f.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient)
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    f.reset();
    this.editMode = false;

    // this.ingredientAdded.emit(ingredient);

  }

  onDelete(f: NgForm) {
    if (this.editMode) {
      this.shoppingListService.deleteIngredient(this.editedItemIndex)
      this.onClear(f);
      this.editMode = false;
    } else {
      this.onClear(f);
    }

  }

  onClear(f: NgForm) {
    f.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
