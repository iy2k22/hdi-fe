import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ToastMessage } from '../models/toast-msg';

@Injectable({
  providedIn: 'root',
})
export class ToastSvc {
  currentToast = signal<ToastMessage | null>(null);
  
  show(msg: ToastMessage) {
    this.currentToast.set(msg);
  }
  
  clear() {
    this.currentToast.set(null);
  }
}
