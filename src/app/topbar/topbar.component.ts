import { AppComponent } from './../app.component';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

  ngOnInit() {
  }

  toggle(event) {
    this.app.rightpanelActived = !this.app.rightpanelActived;
  }

}
