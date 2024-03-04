import {Component, EventEmitter, Output} from "@angular/core";


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  tabs = [{key: 'recipes', value: 'Recipes'}, {key: 'shopping-lists', value: 'Shopping List'}]
}
