import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CharacterMocks } from '../Mocks/CharacterMocks';
import { FilmMock } from '../Mocks/FilmsMock';
import { SwapiAccessService } from '../services/swapi-access.service';
import { FilmByCharListComponent } from './film-by-char-list.component';

describe('FilmByCharListComponent', () => {
  let component: FilmByCharListComponent;
  let fixture: ComponentFixture<FilmByCharListComponent>;
  let mockSwapiAccessService: { getFilmsByChar: { and: { returnValue: (arg0: Observable<{}[]>) => void; }; }; };
  let mockActivatedRoute;

  beforeEach(waitForAsync(() => {
    mockSwapiAccessService = jasmine.createSpyObj(['getFilmsByChar']);
    mockActivatedRoute = { queryParams: of({ data: 'test data' }) };

    TestBed.configureTestingModule({
      declarations: [ FilmByCharListComponent ],
      providers: [
        { provide: SwapiAccessService, useValue: mockSwapiAccessService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmByCharListComponent);
    component = fixture.componentInstance;
    component.film = CharacterMocks[0];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the table columns', () => {
    expect(component.tableColumns).toEqual(['title', 'episode_id', 'director', 'producer', 'release_date']);
  });

  it('should initialize the data source and paginator', () => {
    const mockFilms = FilmMock;
    mockSwapiAccessService.getFilmsByChar.and.returnValue(of(mockFilms));

    component.ngOnInit();

    expect(component.dataSource.data).toEqual(mockFilms);
    expect(component.dataSource.paginator).toEqual(component.paginator);
  });
});
