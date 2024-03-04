import {IngredientModel as Ingredient} from "../shared/ingredient.model";
import {EventEmitter} from "@angular/core";
import {Subject} from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  editIngredientIndex = new Subject<number>()
  private shoppingList: Ingredient[] = [
    {name: 'Apple', amount: 20},
    {name: 'tomato', amount: 17},
    {name: 'Pear', amount: 34}
  ]

  getShoppingList() {
    return this.shoppingList.slice()
  }

  addToShoppingList(item: Ingredient) {
    this.shoppingList.push(item)
    this.ingredientsChanged.next(this.shoppingList)
  }

  deleteShoppingListItem(index: number) {
    this.shoppingList = this.shoppingList.filter((item, itemIndex) => itemIndex !== index)
    this.ingredientsChanged.next(this.shoppingList)
  }

  editShoppingListItem(item: Ingredient, index: number) {
    this.shoppingList[index] = item
    this.ingredientsChanged.next(this.shoppingList)
  }

  addMultipleIngredients(ingredients: Ingredient[]) {
    this.shoppingList = [...this.shoppingList, ...ingredients]
    this.ingredientsChanged.next(this.shoppingList)
  }

  getEditItem(index: number) {
    return this.shoppingList[index]
  }

}
