import { Component, inject } from '@angular/core';
import { ToastService } from '../../../../shared/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Breadcrumbs } from "../../../../shared/components/breadcrumbs/breadcrumbs";

@Component({
  selector: 'app-toast',
  imports: [Breadcrumbs],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private toastService = inject(ToastService);

  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'NgBootstrap', url: '/ng-bootstrap' },
    { label: 'Toast' }
  ];

  showSuccessToast() {
    this.toastService.success('¡Hola! Esto es una notificación de éxito.', '¡Éxito!');
  }

  showErrorToast() {
    this.toastService.error('¡Ups! Algo salió mal. Por favor, inténtalo de nuevo.', 'Error');
  }



  returnToIndex() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
