import { DemoComponent } from './demo/demo.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

export const appRouters: Routes = [
  // otherwise redirect to home
  { path: '', component: DemoComponent }
];

export const AppRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouters);
