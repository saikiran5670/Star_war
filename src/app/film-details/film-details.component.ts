import { Component, OnInit } from '@angular/core';
import { SwapiAccessService } from '../services/swapi-access.service';
import { ActivatedRoute } from '@angular/router';
import { Film } from '../interfaces/films.interface';
import { LoaderService } from '../services/loader.service';


@Component({
  selector: 'app-film-details',
  templateUrl: './film-details.component.html',
  styleUrls: ['./film-details.component.scss']
})
export class FilmDetailsComponent implements OnInit{
  displayedColumns = ['title', 'episode_id', 'release_date', 'director'];
  selectedFilmDetials!: Film;
  sub: any;
  paramvalue: any;
  constructor(private accessMovies: SwapiAccessService, private activateRouter:ActivatedRoute, private loader : LoaderService){}
  ngOnInit(): void {
    this.loader.show();
      this.sub = this.activateRouter
        .queryParams
        .subscribe((params:any) => {
          this.paramvalue = params.id
          console.log(this.paramvalue)
        });

        this.accessMovies.getFilmById(this.paramvalue).subscribe((film:any)=>{
          this.selectedFilmDetials = film
        });
  }

}
