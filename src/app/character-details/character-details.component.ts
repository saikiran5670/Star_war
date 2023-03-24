import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { SwapiAccessService } from '../services/swapi-access.service';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  tableColumns = ['name', 'birth_year', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color'];
  dataSource!: MatTableDataSource<CharacterData> ;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  sub: any;
  pageSelection = 1;
  constructor(private accessMovies: SwapiAccessService, private activateRouter:ActivatedRoute){
  }
  ngOnInit(): void {
        this.accessMovies.getCharactersByFilm().subscribe((character:any) =>{
          this.dataSource = new MatTableDataSource(character);
          this.dataSource.paginator = this.paginator;      
        });

  }
}
