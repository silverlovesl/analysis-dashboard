// System Module-------------------------------------------------------------------------------------
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, enableProdMode } from '@angular/core';
import { MyRouterModule, AppRoutingProviders } from './routers';
import { FormsModule, NgControl } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Primeng Module------------------------------------------------------------------------------------
import { InputTextModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ChartModule } from 'primeng/primeng';
// Shared Component----------------------------------------------------------------------------------
import { AppComponent } from './app.component';
import { AppMenuComponent, AppSubMenuComponent } from './shared/menu/menu.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { RightpanelComponent } from './shared/rightpanel/rightpanel.component';
import { FooterComponent } from './shared/footer/footer.component';
// Custom Page---------------------------------------------------------------------------------------
import { DemoComponent } from './pages/demo/demo.component';

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
    MyRouterModule,
    InputTextModule,
    DataTableModule,
    SharedModule,
    ChartModule
  ],
  providers: [AppRoutingProviders],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
