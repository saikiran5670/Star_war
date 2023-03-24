import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterInfoComponent } from './character-info/character-info.component';
import { FilmDetailsComponent } from './film-details/film-details.component';
import { FilmsListComponent } from './films-list/films-list.component';

export const routes: Routes = [
  {path: '', redirectTo: '/films', pathMatch: 'full'},
  {path:'films', component: FilmsListComponent },
  {path:'films-details', component: FilmDetailsComponent },
  {path:'char-info', component: CharacterInfoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
