import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { SwapiAccessService } from '../services/swapi-access.service';

import { CharacterInfoComponent } from './character-info.component';

describe('CharacterInfoComponent', () => {
  let component: CharacterInfoComponent;
  let fixture: ComponentFixture<CharacterInfoComponent>;
  let accessMovies: jasmine.SpyObj<SwapiAccessService>;
  let activateRouter: jasmine.SpyObj<ActivatedRoute>;
  accessMovies = jasmine.createSpyObj('SwapiAccessService', ['getCharactersByFilm']);
  activateRouter = jasmine.createSpyObj('ActivatedRoute', [], { snapshot: { params: { id: '1' } } });


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharacterInfoComponent],
      providers: [
        { provide: SwapiAccessService, useValue: accessMovies },
        { provide: ActivatedRoute, useValue: activateRouter },
      ]
      , schemas: [CUSTOM_ELEMENTS_SCHEMA],

    })

      .compileComponents()

    fixture = TestBed.createComponent(CharacterInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
