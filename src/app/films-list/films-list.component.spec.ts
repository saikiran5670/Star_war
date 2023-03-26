import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Film } from '../interfaces/films.interface';
import { FilmMock } from '../Mocks/FilmsMock';
import { LoaderService } from '../services/loader.service';
import { SwapiAccessService } from '../services/swapi-access.service';
import { FilmsListComponent } from './films-list.component';

describe('FilmsListComponent', () => {
  let component: FilmsListComponent;
  let fixture: ComponentFixture<FilmsListComponent>;
  let accessMovies: SwapiAccessService;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmsListComponent ],
      providers: [
        {
          provide: SwapiAccessService,
          useValue: {
            getFilmsList: () => of([]),
          }
        },
        LoaderService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmsListComponent);
    component = fixture.componentInstance;
    accessMovies = TestBed.inject(SwapiAccessService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch films on init', () => {
    const films: Film[] = FilmMock;
    spyOn(loaderService, 'show');
    spyOn(accessMovies, 'getFilmsList').and.returnValue(of(films));

    component.ngOnInit();

    expect(component.films).toEqual(films);
  });
});
