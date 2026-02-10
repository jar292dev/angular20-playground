import { Component } from '@angular/core';
import { Toast } from '../../models/toast';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-toast-container',
  imports: [NgClass, NgFor],
  templateUrl: './toast-container.html',
  styleUrl: './toast-container.css',
})
export class ToastContainer {
  toasts: Toast[] = [];

  add(toast: Toast) {
    this.toasts.push(toast);

    setTimeout(() => this.remove(toast), toast.delay ?? 5000);
  }

  remove(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
