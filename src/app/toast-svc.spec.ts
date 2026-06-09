import { TestBed } from '@angular/core/testing';

import { ToastSvc } from './toast-svc';

describe('ToastSvc', () => {
  let service: ToastSvc;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastSvc);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
