import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {} 

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl) //get heroes from the server
    .pipe(
      catchError(this.HandleError<Hero[]>('getHeroes', []))
    );

  }

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero
    id=${id}` ); //send the message after fetching the hero
    return of(HEROES.find(hero => hero.id === id));
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }  // this is wrapped in a private log since the Message service get called frequently 
 
}
