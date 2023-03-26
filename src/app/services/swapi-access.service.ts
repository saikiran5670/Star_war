import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, finalize, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Character, CharacterResponse, Film, FilmResponse } from '../interfaces/films.interface';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class SwapiAccessService {
  readonly url = 'http://swapi.dev/api'
  currentMovie!: Film;
  currentCharacter!: any;

  constructor(private http: HttpClient, private loader: LoaderService) { }

  getFilmsList(): Observable<Film[]> {
    this.loader.show()
    return this.http.get<FilmResponse>(`http://swapi.dev/api/films`)
      .pipe(map((movie) => movie.results),
        finalize(() => { this.loader.hide() }))
  }

  getFilmById(id: number): Observable<Film> {
    this.loader.show()
    return this.http.get<Film>(`${this.url}/films/${id}`)
      .pipe(map((film) => {
        this.currentMovie = film;
        return film;
      }),
        finalize(() => { this.loader.hide() }))
  }
  getCharactersList(charactersUrl: string): Observable<CharacterResponse> {
    this.loader.show()
    return this.http.get<CharacterResponse>(charactersUrl)
      .pipe(map((characters) => {
        this.currentCharacter = characters.results;
        return characters;
      }),
        finalize(() => {
          this.loader.show()
        }))
  }

  getCharactersByFilm(): Observable<Character[]> {
    this.loader.show();
    const characterRequests = this.currentMovie.characters.map(characterUrl =>
      this.http.get<Character>(characterUrl)
    );
    return forkJoin(characterRequests).pipe(
      map(characters => characters.filter(Boolean)),
      finalize(() => {
        this.loader.hide();
      })
    );
  }

  getFilmsByChar(character: Character): Observable<Film[]> {
    this.loader.show()
    const filmRequests: Observable<Film>[] = character.films.map((filmUrl: string) =>
      this.http.get<Film>(filmUrl));
    return forkJoin(filmRequests).pipe(
      map(films => films.filter(Boolean)),
      finalize(() => {
        this.loader.hide();
      })
    );
  }
}

