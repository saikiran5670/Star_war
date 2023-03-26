import { Component, OnInit } from '@angular/core';
import { Film } from '../interfaces/films.interface';
import { LoaderService } from '../services/loader.service';
import { SwapiAccessService } from '../services/swapi-access.service';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrls: ['./films-list.component.scss']
})
export class FilmsListComponent implements OnInit{
  films: any
constructor(private accessMovies : SwapiAccessService, private loader: LoaderService){
}
ngOnInit(): void {
    this.accessMovies.getFilmsList().subscribe((film:Film[])=>{
      this.films = film
    });
}
}
