import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel as Recipe} from "../recipe.model";
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ActivatedRoute} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeDetailItem: Recipe;
  // id: number;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService) {}
  addToShoppingList() {
    this.shoppingListService.addMultipleIngredients(this.recipeDetailItem.ingredients)
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params.id
      // this.id = id
      this.recipeDetailItem = this.recipeService.getSingleRecipe(id)
    })
  }

}
