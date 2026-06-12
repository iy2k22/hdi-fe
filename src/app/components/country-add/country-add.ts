import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Continent } from '../../models/continent';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Country, CountryAddDTO } from '../../models/country';
import { Footer } from "../footer/footer";
import { ToastSvc } from '../../services/toast-svc';
import { AppToast } from '../toast/toast';
import { CountryNames } from '../../models/country_names';
import { ScoreAddDTO } from '../../models/score';

@Component({
  selector: 'app-country-add',
  imports: [ReactiveFormsModule, Footer, AppToast],
  templateUrl: './country-add.html',
  styleUrl: './country-add.css',
})
export class CountryAdd implements OnInit {
  private apiSvc = inject(ApiService);
  private toastSvc = inject(ToastSvc);
  private fb = inject(FormBuilder);
  
  theForm!: FormArray;
  
  continents = toSignal(this.apiSvc.getContinents(), { initialValue: [] });
  countryNames = toSignal(this.apiSvc.getCountryNamesOnly(), { initialValue: [] });
  
  genFormEntry() {
    return this.fb.group({
      id: [0],
      name: [''],
      continent: [0],
      flag1: [''],
      flag2: [''],
      isMuslim: [false],
      editing: [false]
    })
  }
  
  ngOnInit(): void {
    this.theForm = this.fb.array([this.genFormEntry()]);
  }
  
  addEntry() {
    this.theForm.push(this.genFormEntry());
  }
  
  getFlag(i: number) {
    const { flag1, flag2 } = this.theForm.at(i).value;
    return flag1.length === 5 && flag2.length === 5
    ?
    `&#x${flag1};&#x${flag2}`
    :
    '';
  }
  
  onNameChange(i: number) {
    const base = this.theForm.at(i);
    const { name } = base.value;
    this.apiSvc.getCountry(name).subscribe(x => {
      if (x) {
        base.patchValue({
          ...x,
          editing: true
        });
      } else {
        base.patchValue({
          id: 0,
          editing: false,
        })
      }
    })
  }
  
  deleteEntry(i: number) {
    this.theForm.removeAt(i);
  }
  
  submitData() {
    const toSend: CountryAddDTO[] = this.theForm.value;
    
    this.apiSvc.addCountries(toSend).subscribe({
      next: () => this.toastSvc.show({
        text: 'Uploaded countries',
        type: 'success'
      }),
      error: (err) => {
        this.toastSvc.show({
          text: 'Couldn\'t upload countries',
          type: 'danger'
        })
        console.error(err);
      }
    });
  }
}
