import { AppComponent } from '../../app.component';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';

@Component({
  selector: 'app-rightpanel',
  templateUrl: './rightpanel.component.html',
  styleUrls: ['./rightpanel.component.scss']
})
export class RightpanelComponent implements OnInit {

  constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) { }

  ngOnInit() {
  }

}
