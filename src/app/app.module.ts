import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from './search/search.component';
import {RouterModule, Routes} from '@angular/router';
import {MatGridListModule} from '@angular/material/grid-list';
import {DetailsComponent} from './details/details.component';
import {LogoComponent} from './logo/logo.component';
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";


const routes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'search/:query', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DetailsComponent,
    LogoComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatGridListModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
