import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Score, ScoreAddDTO } from '../../models/score';
import { Footer } from '../footer/footer';
import { AppToast } from '../toast/toast';
import { ToastSvc } from '../../services/toast-svc';
import { CountryNames } from '../../models/country_names';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-score-add',
  imports: [ReactiveFormsModule, Footer, AppToast],
  templateUrl: './score-add.html',
  styleUrl: './score-add.css',
})
export class ScoreAdd implements OnInit {
  private apiSvc = inject(ApiService);
  private fb = inject(FormBuilder);
  private toastSvc = inject(ToastSvc);
  
  scrId: number = 0;
  
  min: number = 0;
  max: number = 1;
  step: number = 0.001;
  
  
  countries = toSignal(this.apiSvc.getScoreAddCountry(), { initialValue: [] });
  scoreTypes = toSignal(this.apiSvc.getScoreTypes(), { initialValue: [] });
  countryNames!: CountryNames;
  
  /*
  theForm: FormGroup = this.fb.group({
    country: [0],
    scoreValue: [0],
    year: [2023],
    scoreType: [1]
  });
  */
  theForm: FormArray = this.fb.array([]);
  scr$!: Subscription;
 
  ngOnInit(): void {
    this.apiSvc.getCountryNames().subscribe(x => this.countryNames = x);
    
    const localScores = localStorage.getItem('scores');
    if (localScores && localScores.length > 0) {
      const parsed = JSON.parse(localScores);
      for (let i = 0; i < parsed.length; ++i) {
        this.theForm.push(this.genRow());
      }
      this.theForm.setValue(parsed);
    } else
      this.theForm.push(this.genRow());
    this.scr$ = this.theForm.valueChanges.subscribe(() => localStorage.setItem('scores', JSON.stringify(this.theForm.value)));
  }
  
  sendData(e: Event) {
    e.preventDefault();
    
    const toSend: ScoreAddDTO[] = this.theForm.controls.map(
      x => {
        const result: ScoreAddDTO = x.value;
        if (result.notRanked)
          result.scoreValue = -1;
        return result;
      }
    );
    
    return this.apiSvc.addScores(toSend).subscribe({
      next: () => this.toastSvc.show({
        text: 'Uploaded scores',
        type: 'success'
      }),
      error: () => this.toastSvc.show({
        text: 'Couldn\'t upload scores',
        type: 'danger'
      })
    })
  }
  
  changeRank(idx: number) {
    const toWorkOn = this.theForm.at(idx);
    toWorkOn.value.notRanked ?
    toWorkOn.get('scoreValue')?.disable()
    :
    toWorkOn.get('scoreValue')?.enable()
    ;
  }
  
  getScore(idx: number) {
    const toWorkOn = this.theForm.at(idx);
    const { country, year, scoreType } = toWorkOn.value;
    const theType = this.scoreTypes()[scoreType - 1];
    this.min = theType.min;
    this.max = theType.max;
    this.step = theType.step;
    console.log(scoreType);
    this.apiSvc.getScore(country, year, scoreType).subscribe(x => {
      if (x) {
        toWorkOn.patchValue({
          scoreValue: x.scoreValue,
          editing: true,
          id: x.id
        });
        if (x.scoreValue === -1) {
          toWorkOn.get('notRanked')?.setValue(true);
          toWorkOn.get('scoreValue')?.disable();
        } else {
          toWorkOn.get('notRanked')?.setValue(false);
          toWorkOn.get('scoreValue')?.enable();
        }
      } else {
        toWorkOn.patchValue({
          id: 0,
          editing: false
        })
      }
    })
  }
  
  addRow() {
    this.theForm.push(this.genRow());
  }
  
  deleteRow(idx: number) {
    this.theForm.removeAt(idx);
  }
  
  genRow() {
    return this.fb.group({
    country: [0],
    scoreValue: [0],
    year: [2023],
    scoreType: [1],
    notRanked: [false]
    })
  }
  
  resetForm() {
    this.theForm.clear();
    this.theForm.push(this.genRow());
  }
}
