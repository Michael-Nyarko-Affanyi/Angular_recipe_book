import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel as Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../services/shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',

})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = []
  newIngredientAddedSub: Subscription
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getShoppingList()
    this.newIngredientAddedSub = this.shoppingListService.ingredientsChanged.subscribe((value: Ingredient[]) => {
      this.ingredients = value
    })
  }

  onEditItem(index: number) {
    this.shoppingListService.editIngredientIndex.next(index)
  }

  ngOnDestroy() {
    this.newIngredientAddedSub.unsubscribe()
  }
}
