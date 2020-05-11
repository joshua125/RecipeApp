import { Component, OnInit, Input } from '@angular/core';
import { Ingredient } from 'src/app/models/Ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  @Input() ingredients: Ingredient[] = [
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  onEditItem(index: number) {
    this.shoppingListService.shoppingListEditable.next(index)
  }

}
