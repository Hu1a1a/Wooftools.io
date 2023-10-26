import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './Module/app.angular.material.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularUIModule } from './Module/app.angular.ui.component';
import { AppViewComponent } from './Module/app.angular.view.component';
import { AppLayoutComponent } from './Module/app.angular.layout.component';
import { SafePipe } from './app/pair-explorer/pair-explorer.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [AppComponent, AppViewComponent, AppLayoutComponent, SafePipe],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularUIModule,
    ClipboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
