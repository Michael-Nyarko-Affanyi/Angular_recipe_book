import {EventEmitter, Injectable} from '@angular/core';
import {RecipeModel as Recipe} from "../recipe/recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
export class RecipeService {
  private recipes: Recipe[] = []
  private recipeSelected = new EventEmitter<Recipe>

  constructor() { }
  getRecipe() {
    return this.recipes.slice()
  }
  addRecipe(name: string, desc: string, image: string, ingredients: IngredientModel[]) {
    this.recipes.push(new Recipe(name, desc, image, ingredients))
  }

  getSingleRecipe(index: number) : Recipe {
    return this.recipes.find((recipe: Recipe, recipeIndex: number) => recipeIndex === index)
  }
  emitRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe)
  }

  subscribeToRecipeSelected(callback: Function) {
    this.recipeSelected.subscribe(callback)
  }
}
