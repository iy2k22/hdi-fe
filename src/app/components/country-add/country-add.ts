import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Continent } from '../../models/continent';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Country } from '../../models/country';
import { Footer } from "../footer/footer";
import { ToastSvc } from '../../services/toast-svc';
import { AppToast } from '../toast/toast';
import { CountryNames } from '../../models/country_names';

@Component({
  selector: 'app-country-add',
  imports: [ReactiveFormsModule, Footer, AppToast],
  templateUrl: './country-add.html',
  styleUrl: './country-add.css',
})
export class CountryAdd implements OnInit {
  private apiSvc = inject(ApiService);
  private fb = inject(FormBuilder);
  private toastSvc = inject(ToastSvc);
  
  continents = toSignal(this.apiSvc.getContinents(), { initialValue: [] });
  countryNames!: string[];
  editing: boolean = false;
  id: number = 0;
  
  theForm: FormGroup = this.fb.group({
    name: [''],
    continent: [1],
    flag1: [''],
    flag2: [''],
    isMuslim: [false]
  });
  flag: string = '';
  
  ngOnInit(): void {
    this.apiSvc.getCountryNamesOnly().subscribe(x => this.countryNames = x);
  }
  
  sendData(e: Event) {
    e.preventDefault();
    const toSend: Country = {
      id: this.id,
      ...this.theForm.value,
    };

    return !this.editing ?
    this.apiSvc.createCountry(toSend).subscribe({
      next: () => this.toastSvc.show({
        text: `${toSend.name} created!`,
        type: 'success'
      }),
      error: () => this.toastSvc.show({
        text: `${toSend.name} not created.`,
        type: 'danger'
      })
    })
    :
    this.apiSvc.updateCountry(toSend).subscribe({
      next: () => this.toastSvc.show({
        text: `${toSend.name} updated!`,
        type: 'success'
      }),
      error: () => this.toastSvc.show({
        text: `${toSend.name} not updated.`,
        type: 'danger'
      })
    })
    ;
  }
  
  onFlagChange(e: Event) {
    e.preventDefault();
    this.changeTheFlag();
  }
  
  changeTheFlag() {
    const f1 = this.theForm.value.flag1;
    const f2 = this.theForm.value.flag2;
    if (f1.length === 5 && f2.length === 5)
      this.flag = `&#x${f1};&#x${f2};`;
    else
      this.flag = '';
  }
  
  onNameChange(e: Event) {
    e.preventDefault();
    const name = this.theForm.value.name;
    if (this.countryNames.includes(name)) {
      this.editing = true;
      this.apiSvc.getCountry(name).subscribe(x => {
        if (x) {
          console.log(x);
          this.id = x.id;
          this.theForm.patchValue({
            continent: x.continent,
            flag1: x.flag1,
            flag2: x.flag2,
            isMuslim: x.isMuslim
          })
        }
        this.changeTheFlag();
      })
    } else {
      console.log('ok');
      this.editing = false;
      this.id = 0;
    }
  }
}
