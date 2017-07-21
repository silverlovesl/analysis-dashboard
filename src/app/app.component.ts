import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public layoutStatic: boolean = false;
  public mobileMenuActive: boolean = true;
  public rightpanelActived: boolean;

  toggle(event) {
    this.layoutStatic = !this.layoutStatic;
  }

}
