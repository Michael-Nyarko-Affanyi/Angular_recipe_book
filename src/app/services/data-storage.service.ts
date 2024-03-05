import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {RecipeModel} from "../recipe/recipe.model";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService) {}

  saveRecipes() {
    const recipes = this.recipesService.getRecipe()
    this.http.put('https://ng-course-recipe-book-6a6d8-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log("res:::", res)
      })
  }

  fetchRecipes() {
    this.http.get<RecipeModel[]>('https://ng-course-recipe-book-6a6d8-default-rtdb.firebaseio.com/recipes.json')
      .subscribe(recipes => {
        this.recipesService.setRecipes(recipes)
      })
  }
}
