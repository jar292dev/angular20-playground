import { Component, ViewChild } from '@angular/core';
import { Header } from "../partials/header/header";
import { Sidebar } from "../partials/sidebar/sidebar";
import { Footer } from "../partials/footer/footer";
import { RouterOutlet } from "@angular/router";
import { ToastContainer } from "../../../shared/components/toast-container/toast-container";
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-main-layout',
  imports: [Header, Sidebar, Footer, RouterOutlet, ToastContainer],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
      @ViewChild(ToastContainer) // Obtener referencia al ToastContainer
  toastContainer!: ToastContainer;

  constructor(private toastService: ToastService) {}

  ngAfterViewInit() { // Registrar el ToastContainer en el ToastService
    this.toastService.register(this.toastContainer);
  }
}
