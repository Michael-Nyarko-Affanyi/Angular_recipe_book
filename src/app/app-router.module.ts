import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe/recipe.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailComponent} from "./recipe/recipe-detail/recipe-detail.component";
import {NoRecipeComponent} from "./no-recipe/no-recipe.component";
import {RecipeEditComponent} from "./recipe/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./services/recipes-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./services/auth-guard.service";

const appRoutes : Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'recipes', component: RecipeComponent, canActivate: [AuthGuard], children: [
      {path: '', component: NoRecipeComponent},
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]},
    ]},
  {path: 'shopping-lists', component: ShoppingListComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRouterModule {

}
