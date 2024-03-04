import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentTab = 'recipe'


  handleNavigation(tab: string) {
    this.currentTab = tab
  }
}
