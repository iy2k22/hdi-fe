import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreTypeAdd } from './score-type-add';

describe('ScoreTypeAdd', () => {
  let component: ScoreTypeAdd;
  let fixture: ComponentFixture<ScoreTypeAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreTypeAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreTypeAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
