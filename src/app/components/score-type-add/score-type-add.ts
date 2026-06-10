import { Component, inject, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ScoreType, ScoreTypeAddDTO } from '../../models/score_types';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiService } from '../../services/api-service';
import { Footer } from "../footer/footer";
import { AppToast } from "../toast/toast";
import { ToastSvc } from '../../services/toast-svc';

@Component({
  selector: 'app-score-type-add',
  imports: [ReactiveFormsModule, Footer, AppToast],
  templateUrl: './score-type-add.html',
  styleUrl: './score-type-add.css',
})
export class ScoreTypeAdd {
  private fb = inject(FormBuilder);
  private apiSvc = inject(ApiService);
  private toastSvc = inject(ToastSvc);
  
  theForm: FormArray = this.fb.array([
    this.fb.group({
      id: [0],
      name: [''],
      min: [0],
      max: [1],
      step: [0.001],
      round: [3],
      ascending: [false],
      editing: [false]
    })
  ]);
  
  scoreTypes = toSignal(this.apiSvc.getScoreTypes(), { initialValue: [] });
  
  onNameChange(idx: number) {
    const names: string[] = this.scoreTypes().map(x => x.name);
    const toWorkOn = this.theForm.at(idx).value;
    const name = toWorkOn.name;
    
    const nameIdx = names.indexOf(name);
    if (nameIdx !== -1) {
      console.log('ok');
      this.theForm.at(idx).patchValue({
        ...this.scoreTypes()[nameIdx],
        editing: true
      });
      console.log(this.theForm.at(idx).value);
    } else {
      this.theForm.at(idx).patchValue({
        id: 0,
        editing: false
      })
    }
  }
  
  addEntry() {
    this.theForm.push(this.fb.group({
      id: [0],
      name: [''],
      min: [0],
      max: [1],
      step: [0.001],
      round: [3],
      ascending: [false],
      editing: [false]
    }))
  }
  
  uploadTypes() {
    const toSend: ScoreTypeAddDTO[] = this.theForm.controls.map(
      x => x.value
    );
    
    return this.apiSvc.uploadScoreTypes(toSend).subscribe({
      next: () => this.toastSvc.show({
        text: 'Uploaded score types',
        type: 'success'
      }),
      error: () => this.toastSvc.show({
        text: 'Couldn\'t upload score types',
        type: 'danger'
      })
    })
  }
}
