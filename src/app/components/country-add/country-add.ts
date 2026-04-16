import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { Continent } from '../../models/continent';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Country } from '../../models/country';

@Component({
  selector: 'app-country-add',
  imports: [ReactiveFormsModule],
  templateUrl: './country-add.html',
  styleUrl: './country-add.css',
})
export class CountryAdd {
  private apiSvc = inject(ApiService);
  private fb = inject(FormBuilder);
  
  continents = toSignal(this.apiSvc.getContinents(), { initialValue: [] });
  
  theForm: FormGroup = this.fb.group({
    name: [''],
    continent: [1],
    flag1: [''],
    flag2: ['']
  });
  
  sendData(e: Event) {
    e.preventDefault();
    const toSend: Country = {
      id: 0,
      ...this.theForm.value,
    };

    return this.apiSvc.createCountry(toSend).subscribe({
      next: () => console.log(`${toSend.name} created!`),
      error: () => console.log(`${toSend.name} not created.`)
    });
  }
}
