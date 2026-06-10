import { Component, inject, computed, signal, OnInit, NgZone } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CountryAdd } from '../country-add/country-add';
import { ApiService } from '../../services/api-service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { HdiTable } from '../hdi-table/hdi-table';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, startWith, switchMap } from 'rxjs';
import { ScoreListCountry } from '../../models/score_list_country';
import { AsyncPipe } from '@angular/common';
import { Footer } from "../footer/footer";
import { ScoreType } from '../../models/score_types';


// name, min, max
type Category = [string, number, number];

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HdiTable, ReactiveFormsModule, AsyncPipe, Footer],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private apiSvc = inject(ApiService);
  private zone = inject(NgZone);
  categories: Category[] = [
    ["Very High", 0.8, 1],
    ["High", 0.7, 0.8],
    ["Medium", 0.55, 0.7],
    ["Low", 0, 0.55],
    ["Not ranked", -1, 0]
  ];
  
  countries!: ScoreListCountry[];
  continent = new FormControl(0, { nonNullable: true });
  isMuslim = new FormControl(false, { nonNullable: true });
  year = new FormControl(2023, { nonNullable: true });
  scoreType = new FormControl(1, { nonNullable: true });
  round: number = 3;
  min: number = 0;
  max: number = 1;
  
  /*
  cnt$ = this.continent.valueChanges.pipe(
    switchMap(() => this.apiSvc.getScoreListCountry(this.continent.value, this.isMuslim.value))
  );
  */

  cnt$ = combineLatest([
    this.continent.valueChanges.pipe(startWith(this.continent.value)),
    this.isMuslim.valueChanges.pipe(startWith(this.isMuslim.value)),
    this.year.valueChanges.pipe(startWith(this.year.value)),
    this.scoreType.valueChanges.pipe(startWith(this.scoreType.value))
  ]).pipe(
    switchMap((values) => this.apiSvc.getScoreListCountry(...values))
  );
  
  scr$ = this.scoreType.valueChanges.subscribe(x => {
    this.round = this.scoreTypes()[x - 1].round;
    this.min = this.scoreTypes()[x - 1].min;
    this.max = this.scoreTypes()[x - 1].max;
  });

  continents = toSignal(this.apiSvc.getContinents(), { initialValue: [] });
  scoreTypes = toSignal(this.apiSvc.getScoreTypes(), { initialValue: [] });
}
