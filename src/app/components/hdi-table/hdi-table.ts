import { Component, input, OnInit } from '@angular/core';
import { ScoreListCountry } from '../../models/score_list_country';

@Component({
  selector: 'app-hdi-table',
  imports: [],
  templateUrl: './hdi-table.html',
  styleUrl: './hdi-table.css',
})
export class HdiTable {
  data = input<ScoreListCountry[]>([]);
  round = input<number>(3);
  min = input<number>(0);
  max = input<number>(1);
  
  getColor(scr: number) {
    const hue = (scr / this.max()) * 120;
    return `hsl(${hue}, 50%, 50%)`;
  }
}
