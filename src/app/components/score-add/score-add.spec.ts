import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreAdd } from './score-add';

describe('ScoreAdd', () => {
  let component: ScoreAdd;
  let fixture: ComponentFixture<ScoreAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScoreAdd],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
