
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SwapiAccessService } from './swapi-access.service';
import { LoaderService } from './loader.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Character, Film } from '../interfaces/films.interface';
import { FilmMock } from '../Mocks/FilmsMock';
import { CharacterMocks } from '../Mocks/CharacterMocks';

describe('SwapiAccessService', () => {
  let service: SwapiAccessService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoaderService, SwapiAccessService, HttpClient]
    });
    service = TestBed.inject(SwapiAccessService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show and hide the loader while fetching films', () => {
    service.getFilmsList().subscribe((films) => {
      expect(films.length).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(`http://swapi.dev/api/films`);
    expect(service.currentMovie).toBeUndefined();
    expect(req.request.method).toBe('GET');
    req.flush({ results: [{ title: 'A New Hope' }] });
    expect(service.currentMovie).toBeUndefined();
    TestBed.inject(LoaderService).loading$.subscribe(loading => {
      expect(loading).toBeFalse(); 
    })
    httpMock.verify();
  });

  it('should fetch film by id and set it as currentMovie', () => {
    service.getFilmById(1).subscribe((film) => {
      expect(film.title).toBe('A New Hope');
    });
    const req = httpMock.expectOne(`${service.url}/films/1`);
    expect(service.currentMovie).toBeUndefined();
    expect(req.request.method).toBe('GET');
    req.flush({ title: 'A New Hope' });
    expect(service.currentMovie.title).toBe('A New Hope');
    httpMock.verify();
  });

  it('should fetch character list and set it as currentCharacter', () => {
    const charactersUrl = 'http://swapi.dev/api/characters';
    service.getCharactersList(charactersUrl).subscribe((characters) => {
      expect(characters.results.length).toBeGreaterThan(0);
    });
    const req = httpMock.expectOne(charactersUrl);
    expect(service.currentCharacter).toBeUndefined();
    expect(req.request.method).toBe('GET');
    req.flush({ results: [{ name: 'Luke Skywalker' }] });
    expect(service.currentCharacter[0].name).toBe('Luke Skywalker');
    httpMock.verify();
  });
  
  it('should get characters by film', () => {
    const mockFilm: Film[] = FilmMock;
    const mockCharacter1: Character[] = CharacterMocks;

    service.currentMovie = mockFilm[0];

    service.getCharactersByFilm().subscribe((characters: Character[]) => {
      expect(characters.length).toBe(mockCharacter1.length);
      expect(characters).toEqual(mockCharacter1);
    });

    const requests = httpMock.match('https://swapi.dev/api/people/1/');
    expect(requests).toBeTruthy()
});
});
