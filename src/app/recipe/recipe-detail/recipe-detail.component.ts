import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel as Recipe} from "../recipe.model";
import {IngredientModel} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../services/recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeDetailItem: Recipe;
  itemId: number
  // id: number;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) {}
  addToShoppingList() {
    this.shoppingListService.addMultipleIngredients(this.recipeDetailItem.ingredients)
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.itemId)
    this.router.navigate(['/recipes'])
    // this.recipeDetailItem = {}
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.itemId = +params.id
      // this.id = id
      this.recipeDetailItem = this.recipeService.getSingleRecipe(this.itemId)
    })
  }

}
