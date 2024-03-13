import {Component, Input, OnInit} from '@angular/core';
import {RecipeModel as Recipe} from "./recipe.model";
import {RecipeService} from "../services/recipe.service";
import {DataStorageService} from "../services/data-storage.service";

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css',
  // providers: [RecipeService]
})
export class RecipeComponent implements OnInit{
 @Input() recipeItem: Recipe;

 constructor(private recipeService: RecipeService, private dataStorageService: DataStorageService) {}

  ngOnInit() {
   this.dataStorageService.fetchRecipes().subscribe()
 }
}
