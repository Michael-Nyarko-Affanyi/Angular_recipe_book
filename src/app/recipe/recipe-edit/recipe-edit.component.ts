import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {RecipeService} from "../../services/recipe.service";
import {RecipeModel as Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit{
  editMode: boolean = false
  editItem: Recipe
  recipeForm: FormGroup
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.editMode = !!param.id
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
        name: new FormControl(ingredient.name),
        amount: new FormControl(ingredient.amount)
      })
    }) : [])

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      description: new FormControl(recipeDesc),
      imagePath: new FormControl(recipeImage),
      ingredients
    })

    console.log(this.controls)
  }

  onSubmit() {}

  protected readonly FormArray = FormArray;
}
