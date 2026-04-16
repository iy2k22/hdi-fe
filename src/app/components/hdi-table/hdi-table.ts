import { Component, input, OnInit } from '@angular/core';
import { ScoreListCountry } from '../../models/score_list_country';

@Component({
  selector: 'app-hdi-table',
  imports: [],
  templateUrl: './hdi-table.html',
  styleUrl: './hdi-table.css',
})
export class HdiTable implements OnInit {
  data = input<ScoreListCountry[]>([]);
  
  ngOnInit(): void {
  }
}
