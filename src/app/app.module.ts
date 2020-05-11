import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ShoppingListComponent } from './components/shopping-list-feature/shopping-list/shopping-list.component';
import { ShoppingListEditComponent } from './components/shopping-list-feature/shopping-list-edit/shopping-list-edit.component';
import { RecipeListComponent } from './components/recipe-book-feature/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './components/recipe-book-feature/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './components/recipe-book-feature/recipe-detail/recipe-detail.component';
import { HeaderComponent } from './header/header/header.component';
import { ShoppingListContainerComponent } from './components/shopping-list-container/shopping-list-container.component';
import { RecipeBookContainerComponent } from './components/recipe-book-container/recipe-book-container.component';
import { DropdownDirective } from './shared/dropdown-directive';
import { ShoppingListService } from './services/shopping-list.service';
import { AppRoutingModule } from './app-routing-module';
import { RecipeStartComponent } from './components/recipe-book-feature/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-book-feature/recipe-edit/recipe-edit.component';
import { RecipeService } from './services/recipe.service'
@NgModule({
  declarations: [
    AppComponent,
    ShoppingListComponent,
    ShoppingListEditComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    HeaderComponent,
    ShoppingListContainerComponent,
    RecipeBookContainerComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService, RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
