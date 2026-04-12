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

  menuItems = [
    { label: 'Formly Básico', path: '/formly/basico' },
    { label: 'Custom Types', path: '/formly/custom-types' },
    { label: 'Floating labels', path: '/formly/floating-labels'},
    { label: 'Field rows', path: '/formly/field-rows'},
    { label: 'Field validations', path: '/formly/field-validations'},
    { label: 'Field factory', path: '/formly/field-factory'}

  ];

}
