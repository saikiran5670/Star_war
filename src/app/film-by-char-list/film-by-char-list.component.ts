import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Character, Film } from '../interfaces/films.interface';
import { SwapiAccessService } from '../services/swapi-access.service';

@Component({
  selector: 'app-film-by-char-list',
  templateUrl: './film-by-char-list.component.html',
  styleUrls: ['./film-by-char-list.component.scss']
})
export class FilmByCharListComponent {
  @Input() film!:Character;
  tableColumns = ['title', 'episode_id', 'director', 'producer', 'release_date'];
  dataSource!: MatTableDataSource<Film> ;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  sub: any;
  paramvalue: any;

  constructor(private accessMovies: SwapiAccessService, private activateRouter:ActivatedRoute){
  }
  ngOnInit(): void { 
      this.sub = this.activateRouter
        .queryParams
        .subscribe((params:any) => {
          this.paramvalue = params.data
        });

       this.accessMovies.getFilmsByChar(this.film).subscribe((a)=>{
        this.dataSource = new MatTableDataSource(a);
        this.dataSource.paginator = this.paginator;  
        this.paramvalue = a.map(val => val.url.split('/')[5])
        this.dataSource.filteredData.filter((a,i) => a.id = this.paramvalue[i])
       })
      }
    }
