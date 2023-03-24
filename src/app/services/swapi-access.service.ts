import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, finalize, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';
import { Character, CharacterResponse, Film, FilmResponse } from '../interfaces/films.interface';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class SwapiAccessService {
  private readonly url = 'http://swapi.dev/api'
  currentMovie!: Film;
  currentCharacter!: any;

  constructor(private http: HttpClient, private loader: LoaderService) { 
    this.loader.show()
  }

  getFilmsList(): Observable<Film[]> {
    return this.http.get<FilmResponse>(`http://swapi.dev/api/films`)
      .pipe(map((movie) => movie.results),
        finalize(() => { this.loader.hide() }))
  }

  getFilmById(id: number): Observable<Film> {
    return this.http.get<Film>(`${this.url}/films/${id}`)
      .pipe(map((film) => {
        this.currentMovie = film;
        return film;
      }))
  }
  getCharactersList(charactersUrl: string): Observable<CharacterResponse> {

    return this.http.get<CharacterResponse>(charactersUrl)
      .pipe(map((characters) => {
        this.currentCharacter = characters.results;
        return characters;
      }),
        finalize(() => {
        }))
  }

  getCharactersByFilm(): Observable<Character[]> {

    const characterRequests = this.currentMovie.characters.map(characterUrl =>
      this.http.get<Character>(characterUrl).pipe(
      )
    );
    return forkJoin(characterRequests).pipe(
      map(characters => characters.filter(Boolean))
    );
  }
  getFilmsByChar(character: Character): Observable<Film[]> {

    const filmRequests: Observable<Film>[] = character.films.map((filmUrl: string) =>
      this.http.get<Film>(filmUrl));
    return forkJoin(filmRequests).pipe(
      map(films => films.filter(Boolean))
    );
  }
}

