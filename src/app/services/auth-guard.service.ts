import {
  ActivatedRouteSnapshot,
  CanActivate,
  createUrlTreeFromSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, map, take} from "rxjs/operators";


@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private authService: AuthService, private router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map(user => {
      if (!!user) {
        return true
      }
      return createUrlTreeFromSnapshot(route, ['auth'])
    }))
  }
}
