import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface Breadcrumb {
  label: string;
  url?: string;
}

/**
 * Componente para mostrar una barra de navegación tipo "breadcrumb" (migas de pan) en la aplicación.
 * El componente recibe una lista de objetos Breadcrumb, cada uno con una etiqueta y una URL opcional.
 * Si la URL está presente, el breadcrumb se renderiza como un enlace; de lo contrario, se muestra como texto plano.
 * Este componente es útil para mejorar la navegación y la experiencia del usuario al mostrar la jerarquía de páginas o secciones dentro de la aplicación.
 */

@Component({
  selector: 'app-breadcrumbs',
  imports: [RouterLink],
  templateUrl: './breadcrumbs.html',
  styleUrl: './breadcrumbs.scss',
})
export class Breadcrumbs {
  @Input() breadcrumbs: Breadcrumb[] = [];
  @Input() separator = '/';

}
