import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule, routes } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsListComponent } from './films-list/films-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FilmDetailsComponent } from './film-details/film-details.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { RouterModule } from '@angular/router';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { FilmByCharListComponent } from './film-by-char-list/film-by-char-list.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    FilmDetailsComponent,
    CharacterDetailsComponent,
    CharacterInfoComponent,
    FilmByCharListComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
