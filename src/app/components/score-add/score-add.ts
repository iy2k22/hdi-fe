import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Score } from '../../models/score';

@Component({
  selector: 'app-score-add',
  imports: [ReactiveFormsModule],
  templateUrl: './score-add.html',
  styleUrl: './score-add.css',
})
export class ScoreAdd {
  private apiSvc = inject(ApiService);
  private fb = inject(FormBuilder);
  
  countries = toSignal(this.apiSvc.getScoreAddCountry(), { initialValue: [] });
  
  theForm: FormGroup = this.fb.group({
    country: [0],
    scoreValue: [0],
    year: [2023]
  })
  
  sendData(e: Event) {
    e.preventDefault();

    const toSend: Score = {
      id: 0,
      ...this.theForm.value
    };
    
    return this.apiSvc.addScore(toSend).subscribe({
      next: () => (console.log(`Added score for country ${toSend.country}!`)),
      error: () => (console.error(`Could not add score for country ${toSend.country}`))
    });
  }
}
