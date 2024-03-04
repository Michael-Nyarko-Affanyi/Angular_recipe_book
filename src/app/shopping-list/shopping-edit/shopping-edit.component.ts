import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {IngredientModel as Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {FormGroup, NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  @ViewChild('editForm') editForm: NgForm
  editIndexSub: Subscription
  editMode: boolean = false
  editItem: Ingredient
  editItemIndex: number
  constructor(private shoppingListService: ShoppingListService) {
  }
  ngOnInit() {
    this.editIndexSub = this.shoppingListService.editIngredientIndex.subscribe((index: number) => {
      this.editItemIndex = index
      this.editMode = true
      this.editItem = this.shoppingListService.getEditItem(index)
      this.editForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      })
    })

  }

  ngOnDestroy() {
    this.editIndexSub.unsubscribe()
  }

  onAddItem(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode) {
      this.shoppingListService.editShoppingListItem(form.value, this.editItemIndex)
    } else {
      this.shoppingListService.addToShoppingList(newIngredient)
    }
    this.clearForm()
  }

  onDelete() {
    this.shoppingListService.deleteShoppingListItem(this.editItemIndex)
    this.clearForm()
  }

  clearForm() {
    this.editForm.reset()
    this.editMode = false
  }
}
