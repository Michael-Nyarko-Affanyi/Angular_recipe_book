import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {DataStorageService} from "./data-storage.service";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<any>{
  constructor(private dataStorageService: DataStorageService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.dataStorageService.fetchRecipes()
  }
}
