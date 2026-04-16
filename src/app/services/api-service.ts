import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Continent } from '../models/continent';
import { Country } from '../models/country';
import { ScoreAddCountry } from '../models/score_add_country';
import { Score } from '../models/score';
import { ScoreListCountry } from '../models/score_list_country';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:5098/Hdi';
  
  constructor(private http: HttpClient) {}
  
  getContinents() {
    return this.http.get<Continent[]>(`${this.baseUrl}/GetContinents`);
  }
  
  createCountry(country: Country) {
    return this.http.post(`${this.baseUrl}/CreateCountry`, country);
  }
  
  getScoreAddCountry() {
    return this.http.get<ScoreAddCountry[]>(`${this.baseUrl}/ScoreAddCountry`);
  }
  
  addScore(score: Score) {
    return this.http.post(`${this.baseUrl}/AddScore`, score);
  }
  
  getScoreListCountry() {
    return this.http.get<ScoreListCountry[]>(`${this.baseUrl}/GetScoreListCountry`);
  }
}
