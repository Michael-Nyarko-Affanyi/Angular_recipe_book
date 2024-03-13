import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";
import {Subscription} from "rxjs";
import {AuthService} from "../services/auth.service";


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  tabs = [{key: 'recipes', value: 'Recipes'}, {key: 'auth', value: 'Authenticate'}, {key: 'shopping-lists', value: 'Shopping List'}]
  isAuthenticated = false
  userSubscription: Subscription

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }
  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user) => {
      // console.log("user:::",user)
      if(user) {
        this.isAuthenticated = true
      }
    })
  }

  handleSave() {
    this.dataStorageService.saveRecipes()
  }

  handleFetch() {
    this.dataStorageService.fetchRecipes()
  }

  handleLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe()
  }
}
