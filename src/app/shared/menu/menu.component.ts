import { Component, Input, OnInit, OnDestroy, EventEmitter, ViewChild, Inject, forwardRef } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Location } from '@angular/common';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class AppMenuComponent implements OnInit {

  @Input() reset: boolean;
  public model: AppMenuModal[];
  public sidebarActive: boolean;
  public animating: boolean;
  public actived: boolean;

  constructor( @Inject(forwardRef(() => AppComponent)) public app: AppComponent) {

  }

  ngOnInit() {

    this.model = [
      { label: 'Home', icon: 'fa fa-fw fa-home', routerLink: ['/demo'] },
      {
        label: 'Components', icon: 'fa fa-fw fa-sitemap',
        items: [
          { label: 'Sample Page', icon: 'fa fa-fw fa-columns', routerLink: ['/sample'] },
          { label: 'Forms', icon: 'fa fa-fw fa-code', routerLink: ['/forms'] },
          { label: 'Data', icon: 'fa fa-fw fa-table', routerLink: ['/data'] },
          { label: 'Panels', icon: 'fa fa-fw fa-list-alt', routerLink: ['/panels'] },
          { label: 'Overlays', icon: 'fa fa-fw fa-square', routerLink: ['/overlays'] },
          { label: 'Menus', icon: 'fa fa-fw fa-minus-square-o', routerLink: ['/menus'] },
          { label: 'Messages', icon: 'fa fa-fw fa-circle-o-notch', routerLink: ['/messages'] },
          { label: 'Charts', icon: 'fa fa-fw fa-area-chart', routerLink: ['/charts'] },
          { label: 'File', icon: 'fa fa-fw fa-arrow-circle-o-up', routerLink: ['/file'] },
          { label: 'Misc', icon: 'fa fa-fw fa-user-secret', routerLink: ['/misc'] }
        ]
      },
      {
        label: 'Template Pages', icon: 'fa fa-fw fa-life-saver',
        items: [
          { label: 'Empty Page', icon: 'fa fa-fw fa-square-o', routerLink: ['/empty'] },
          { label: 'Landing Page', icon: 'fa fa-fw fa-globe', url: 'assets/pages/landing.html', target: '_blank' },
          { label: 'Login Page', icon: 'fa fa-fw fa-sign-in', url: 'assets/pages/login.html', target: '_blank' },
          { label: 'Error Page', icon: 'fa fa-fw fa-exclamation-circle', url: 'assets/pages/error.html', target: '_blank' },
          { label: '404 Page', icon: 'fa fa-fw fa-times', url: 'assets/pages/404.html', target: '_blank' },
          { label: 'Access Denied Page', icon: 'fa fa-fw fa-exclamation-triangle', url: 'assets/pages/access.html', target: '_blank' }
        ]
      },
      {
        label: 'Menu Hierarchy', icon: 'fa fa-fw fa-gg',
        items: [
          {
            label: 'Submenu 1', icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 1.1', icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 1.1.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.1.2', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.1.3', icon: 'fa fa-fw fa-sign-in' },
                ]
              },
              {
                label: 'Submenu 1.2', icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 1.2.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 1.2.2', icon: 'fa fa-fw fa-sign-in' }
                ]
              },
            ]
          },
          {
            label: 'Submenu 2', icon: 'fa fa-fw fa-sign-in',
            items: [
              {
                label: 'Submenu 2.1', icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 2.1.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.1.2', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.1.3', icon: 'fa fa-fw fa-sign-in' },
                ]
              },
              {
                label: 'Submenu 2.2', icon: 'fa fa-fw fa-sign-in',
                items: [
                  { label: 'Submenu 2.2.1', icon: 'fa fa-fw fa-sign-in' },
                  { label: 'Submenu 2.2.2', icon: 'fa fa-fw fa-sign-in' }
                ]
              },
            ]
          }
        ]
      },
      { label: 'Utils', icon: 'fa fa-fw fa-wrench', routerLink: ['/utils'] },
      { label: 'Documentation', icon: 'fa fa-fw fa-book', routerLink: ['/documentation'] }
    ];
  }

  toggle($event) {
    console.log(this.app);
    this.app.layoutStatic = !this.app.layoutStatic;
  }

  onMenuMouseEnter(event) {
    this.sidebarActive = true;
    console.log(this.sidebarActive);
  }

  onMenuMouseLeave(event) {
    this.sidebarActive = false;
    console.log(this.sidebarActive);
  }
}

@Component({
  selector: '[app-submenu]',
  template: `
    <li *ngFor="let menu of menus; count as count; index as i" (click)="toggle($event,menu)" [ngClass]="{'active-menuitem':menu.actived }">
      <a class="active-menuitem-routerlink" href="#/" [routerLink]="menu.routerLink">
        <i [ngClass]="menu.icon"></i>
        <span class="">{{menu.label}}</span>
        <i class="fa fa-fw fa-angle-down layout-submenu-toggler" *ngIf="menu.items && menu.items.length >0"></i>
      </a>
      <ul app-submenu="" [menuModel]="menu.items" [@subMenu]="menu.actived ? 'visible' : 'hidden'"></ul>
    </li>
  `,
  animations: [
    trigger('subMenu', [
      state('hidden', style({
        height: '0'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]
})
export class AppSubMenuComponent implements OnInit {

  public animating: boolean;
  public actived: boolean;

  @Input("menuModel") menus: AppMenuModal[];

  constructor() {

  }

  toggle(event, currentRow: AppMenuModal) {
    for (let item of this.menus) {
      if (item != currentRow) {
        item.actived = false;
      }
    }
    currentRow.actived = !currentRow.actived;
    event.stopPropagation();
  }

  ngOnInit(): void {

  }
}

export interface AppMenuModal {
  label: string
  icon?: string
  url?: string
  target?: string
  actived?: boolean
  routerLink?: string[]
  items?: AppMenuModal[]
}


