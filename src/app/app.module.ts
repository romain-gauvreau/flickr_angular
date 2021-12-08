import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResultComponent } from './result/result.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { RouterModule, Routes } from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import { DetailsComponent } from './details/details.component';
import { LogoComponent } from './logo/logo.component';

const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    ResultComponent,
    SearchComponent,
    DetailsComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
