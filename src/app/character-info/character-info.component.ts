import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { CharacterResponse } from '../interfaces/films.interface';
import { SwapiAccessService } from '../services/swapi-access.service';

@Component({
  selector: 'app-character-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss']
})
export class CharacterInfoComponent implements OnInit {
  tableColumns = ['name', 'birth_year', 'height', 'mass', 'hair_color', 'skin_color', 'eye_color'];
  dataSource!: MatTableDataSource<CharacterData>;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  paramvalue: any;
  pageSelection = 1;
  sub: any;
  selectedActorDetials: any;
  constructor(public accessMovies: SwapiAccessService, public activateRouter: ActivatedRoute) {
  }
  ngOnInit(): void {
    this.sub = this.activateRouter
      .queryParams
      .subscribe((params: any) => {
        this.paramvalue = params.data
      });
    this.accessMovies.getCharactersList(this.paramvalue).subscribe((char: CharacterResponse) => {
      this.selectedActorDetials = char;
    })
  }
}
