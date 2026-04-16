import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { CountryAdd } from '../country-add/country-add';
import { ApiService } from '../../services/api-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { HdiTable } from '../hdi-table/hdi-table';


// name, min, max
type Category = [string, number, number];

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, HdiTable],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {
  private apiSvc = inject(ApiService);
  categories: Category[] = [
    ["Very High", 0.8, 1],
    ["High", 0.7, 0.8],
    ["Medium", 0.55, 0.7],
    ["Low", 0, 0.55]
  ];
  
  countries = toSignal(this.apiSvc.getScoreListCountry(), { initialValue: [] });
}
