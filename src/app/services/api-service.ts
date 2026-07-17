import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Continent } from '../models/continent';
import { Country, CountryAddDTO } from '../models/country';
import { ScoreAddCountry } from '../models/score_add_country';
import { Score, ScoreAddDTO } from '../models/score';
import { ScoreListCountry } from '../models/score_list_country';
import { CountryNames } from '../models/country_names';
import { ScoreType, ScoreTypeAddDTO } from '../models/score_types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = 'http://localhost:5098/Hdi';
  
  constructor(private http: HttpClient) {}
  
  getHttpHeaders(): HttpHeaders {
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });

    return headers;
  }
  
  getContinents() {
    return this.http.get<Continent[]>(`${this.baseUrl}/GetContinents`);
  }
  
  addCountries(countries: CountryAddDTO[]) {
    return this.http.post(`${this.baseUrl}/AddCountries`, countries);
  }
  
  getScoreAddCountry() {
    return this.http.get<ScoreAddCountry[]>(`${this.baseUrl}/ScoreAddCountry`);
  }
  
  addScores(scores: ScoreAddDTO[]) {
    return this.http.post(`${this.baseUrl}/AddScores`, scores);
  }
  
  getScoreListCountry(
    continent: number,
    isMuslim: boolean,
    year: number,
  scoreType: number) {
    return this.http.get<ScoreListCountry[]>(`${this.baseUrl}/GetScoreListCountry`, {
      params: {
        continent,
        isMuslim,
        year,
        scoreType
      }
    });
  }
  
  getCountryNames() {
    return this.http.get<CountryNames>(`${this.baseUrl}/GetCountryNames`);
  }
  
  getScore(country: number, year: number, scoreType: number) {
    return this.http.get<Score | undefined>(`${this.baseUrl}/GetScore`, {
      params: {
        country,
        year,
        scoreType
      }
    })
  }
  
  updateScore(scr: Score) {
    return this.http.patch<number>(`${this.baseUrl}/UpdateScore`, scr);
  }
  
  getCountryNamesOnly() {
    return this.http.get<string[]>(`${this.baseUrl}/GetCountryNamesOnly`);
  }
  
  getCountry(name: string) {
    return this.http.get<Country | undefined>(`${this.baseUrl}/GetCountry`, {
      params: {
        countryName: name
      }
    })
  }
  
  updateCountry(country: Country) {
    return this.http.patch<number>(`${this.baseUrl}/UpdateCountry`, country);
  }
  
  getScoreTypes() {
    return this.http.get<ScoreType[]>(`${this.baseUrl}/GetScoreTypes`);
  }
  
  uploadScoreTypes(types: ScoreTypeAddDTO[]) {
    const headers = this.getHttpHeaders();
    return this.http.post(`${this.baseUrl}/UploadScoreTypes`, types, {
      headers
    });
  }
}
