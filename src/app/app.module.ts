// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ExpressionComponent } from './expression/expression.component';

@NgModule({
  declarations: [
    AppComponent,
    ExpressionComponent,
    // ... other components
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // ... other modules
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
