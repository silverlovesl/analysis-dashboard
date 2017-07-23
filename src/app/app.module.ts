import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { routing, AppRoutingProviders } from './routers';
import { FormsModule, NgControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './menu/menu.component';
import { TopbarComponent } from './topbar/topbar.component';
import { RightpanelComponent } from './rightpanel/rightpanel.component';
import { FooterComponent } from './footer/footer.component';
import { DemoComponent } from './demo/demo.component';
import { InputTextModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';

@NgModule({
  declarations: [
    AppComponent,
    AppMenuComponent,
    AppSubMenuComponent,
    TopbarComponent,
    RightpanelComponent,
    FooterComponent,
    DemoComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    InputTextModule,
    DataTableModule,
    SharedModule,
    ChartModule,
    routing
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
