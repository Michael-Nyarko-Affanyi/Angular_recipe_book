import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "./recipe.service";
import {RecipeModel} from "../recipe/recipe.model";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService) {}

  saveRecipes() {
    const recipes = this.recipesService.getRecipe()
    this.http.put('https://ng-course-recipe-book-6a6d8-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(res => {
        console.log("res:::", res)
      })
  }

  fetchRecipes() {

    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
      return this.http
        .get<RecipeModel[]>('https://ng-course-recipe-book-6a6d8-default-rtdb.firebaseio.com/recipes.json', {params: {auth: user.token}})
      }),
      map(recipes => {
        return recipes.map(recipe => {
          return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
        })
      }),
      tap(recipes => {
        this.recipesService.setRecipes(recipes)
      })
    )

    // return this.http.get<RecipeModel[]>('https://ng-course-recipe-book-6a6d8-default-rtdb.firebaseio.com/recipes.json')
    //   .pipe(
    //
    //   )
  }
}
