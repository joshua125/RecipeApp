import { AppComponent } from "./app.component";
import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './components/recipe-book-feature/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe-book-feature/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe-book-feature/recipe-item/recipe-item.component';
import { ShoppingListContainerComponent } from './components/shopping-list-container/shopping-list-container.component'
import { RecipeBookContainerComponent } from './components/recipe-book-container/recipe-book-container.component';
import { RecipeStartComponent } from './components/recipe-book-feature/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './components/recipe-book-feature/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/recipes', pathMatch: 'full' },
    {
        path: 'recipes', component: RecipeBookContainerComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent },
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    { path: 'shopping', component: ShoppingListContainerComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {

}