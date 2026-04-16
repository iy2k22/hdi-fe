import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdiTable } from './hdi-table';

describe('HdiTable', () => {
  let component: HdiTable;
  let fixture: ComponentFixture<HdiTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HdiTable],
    }).compileComponents();

    fixture = TestBed.createComponent(HdiTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
