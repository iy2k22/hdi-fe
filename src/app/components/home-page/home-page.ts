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


// name, min, max
type Category = [string, number, number];

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HdiTable, ReactiveFormsModule, AsyncPipe],
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
    ["Low", 0, 0.55]
  ];
  
  countries!: ScoreListCountry[];
  continent = new FormControl(0, { nonNullable: true });
  isMuslim = new FormControl(false, { nonNullable: true });
  
  /*
  cnt$ = this.continent.valueChanges.pipe(
    switchMap(() => this.apiSvc.getScoreListCountry(this.continent.value, this.isMuslim.value))
  );
  */

  cnt$ = combineLatest([
    this.continent.valueChanges.pipe(startWith(this.continent.value)),
    this.isMuslim.valueChanges.pipe(startWith(this.isMuslim.value))
  ]).pipe(
    switchMap(([v1, v2]) => this.apiSvc.getScoreListCountry(v1, v2))
  );

  continents = toSignal(this.apiSvc.getContinents(), { initialValue: [] });
}
