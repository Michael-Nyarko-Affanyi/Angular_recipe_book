import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import {RecipeModel as Recipe} from "../recipe.model";
import {ShoppingListService} from "../../services/shopping-list.service";
import {IngredientModel as Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  editMode: boolean = false
  editItem: Recipe
  recipeForm: FormGroup
  editItemId: number
  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private shoppingList: ShoppingListService) {
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.editMode = !!param.id
      this.editItemId = +param.id
      this.editItem = this.recipeService.getSingleRecipe(+param.id)
      this.onInit()
    })
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls
  }

  private onInit() {
    let recipeName = this.editItem ? this.editItem.name : ''
    let recipeImage = this.editItem ? this.editItem.imagePath : ''
    let recipeDesc = this.editItem ? this.editItem.description : ''
    let ingredients = new FormArray(this.editItem ? this.editItem.ingredients?.map((ingredient) => {
      return new FormGroup({
        name: new FormControl(ingredient.name, Validators.required),
        amount: new FormControl(ingredient.amount, Validators.required)
      })
    }) : [])

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDesc, Validators.required),
      imagePath: new FormControl(recipeImage, Validators.required),
      ingredients
    })

    console.log(this.controls)
  }

  handleAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push((new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl(0, Validators.required)
    })))
  }

  handleRemoveIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  onSubmit() {
    if (this.recipeForm.invalid) return
    const name = this.recipeForm.value.name
    const description = this.recipeForm.value.description
    const imagePath = this.recipeForm.value.imagePath
    const ingredients = this.recipeForm.value.ingredients

    if (this.editMode) {
      this.recipeService.editRecipe(this.editItemId, this.recipeForm.value)
      return;
    }
    this.recipeService.addRecipe(name, description, imagePath, ingredients)
  }

  protected readonly FormArray = FormArray;
}
