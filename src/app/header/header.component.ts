import {Component, EventEmitter, Output} from "@angular/core";
import {DataStorageService} from "../services/data-storage.service";


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  tabs = [{key: 'recipes', value: 'Recipes'}, {key: 'shopping-lists', value: 'Shopping List'}]

  constructor(private dataStorageService: DataStorageService) {
  }

  handleSave() {
    this.dataStorageService.saveRecipes()
  }

  handleFetch() {
    this.dataStorageService.fetchRecipes()
  }
}
