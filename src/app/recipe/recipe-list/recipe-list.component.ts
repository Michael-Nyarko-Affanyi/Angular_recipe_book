import {Component, OnDestroy, OnInit} from '@angular/core';
import {RecipeModel as Recipe} from "../recipe.model";
import {RecipeService} from "../../services/recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy{
  recipes: Recipe[] = []
  recipesSubscription: Subscription

  constructor(private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipe()
    this.recipesSubscription = this.recipeService.updatedRecipes.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    })
  }
  ngOnDestroy() {
    this.recipesSubscription.unsubscribe()
  }

}
