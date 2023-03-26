import { HttpClientTestingModule } from "@angular/common/http/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ActivatedRoute } from "@angular/router";
import { async, of } from "rxjs";
import { FilmMock } from "../Mocks/FilmsMock";
import { LoaderService } from "../services/loader.service";
import { SwapiAccessService } from "../services/swapi-access.service";
import { FilmDetailsComponent } from "./film-details.component";

describe('FilmDetailsComponent', () => {
  let component: FilmDetailsComponent;
  let fixture: ComponentFixture<FilmDetailsComponent>;
  let mockActivatedRoute: ActivatedRoute;

  beforeEach((() => {
    mockActivatedRoute = {
      queryParams: of({id: 1}) 
    } as any;

    TestBed.configureTestingModule({
      declarations: [ FilmDetailsComponent ],
      providers: [
        SwapiAccessService,
        LoaderService,
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ],
      imports: [HttpClientTestingModule], 
      schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should call loader.show() method on ngOnInit', () => {
    spyOn(component.loader, 'show');
    component.ngOnInit();
    expect(component.loader.show).toHaveBeenCalled();
  });

  it('should set selectedFilmDetials with the film data', () => {
    spyOn(component.accessMovies, 'getFilmById').and.returnValue(of(FilmMock[0]));

    component.ngOnInit();

    expect(component.selectedFilmDetials).toEqual(FilmMock[0]);
  });
});
