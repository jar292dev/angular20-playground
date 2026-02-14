import { Component } from '@angular/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [Breadcrumbs, RouterLink],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly'},
  ];

}
