import { Component, effect, ElementRef, inject, OnInit, viewChild, ViewChild } from '@angular/core';
import { ToastSvc } from '../../services/toast-svc';
import { Subscription } from 'rxjs';
import { Toast } from 'bootstrap';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class AppToast {
  //@ViewChild("toastEl", { static: true }) toastEl!: ElementRef;
  private toastEl = viewChild<ElementRef<HTMLDivElement>>('toastEl');
  toast!: Toast;
  toastSvc = inject(ToastSvc);
  
  constructor() {
    effect(() => {
      const msg = this.toastSvc.currentToast();
      const elementRef = this.toastEl();
      
      if (msg && elementRef) {
        this.toast = new Toast(elementRef.nativeElement, {
          autohide: true,
          delay: 5000
        });
        
        this.toast.show();
        
        elementRef.nativeElement.addEventListener(
          'hidden.bs.toast',
          () => this.toastSvc.clear(),
        { once: true })
      }
    })
  }
}