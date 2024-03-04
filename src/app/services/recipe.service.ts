import {EventEmitter, Injectable} from '@angular/core';
import {RecipeModel as Recipe} from "../recipe/recipe.model";
import {IngredientModel} from "../shared/ingredient.model";
import {Subject} from "rxjs";
export class RecipeService {
  private recipes: Recipe[] = []
  private recipeSelected = new EventEmitter<Recipe>
  updatedRecipes = new Subject<Recipe[]>()

  constructor() { }
  getRecipe() {
    return this.recipes.slice()
  }
  addRecipe(name: string, desc: string, image: string, ingredients: IngredientModel[]) {
    this.recipes.push(new Recipe(name, desc, image, ingredients))
    this.updatedRecipes.next(this.recipes.slice())
  }
  editRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe
    this.updatedRecipes.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.updatedRecipes.next(this.recipes.slice())
  }

  getSingleRecipe(index: number) : Recipe {
    return this.recipes.find((recipe: Recipe, recipeIndex: number) => recipeIndex === index)
  }
}
