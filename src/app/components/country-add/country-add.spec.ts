import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryAdd } from './country-add';

describe('CountryAdd', () => {
  let component: CountryAdd;
  let fixture: ComponentFixture<CountryAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(CountryAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
