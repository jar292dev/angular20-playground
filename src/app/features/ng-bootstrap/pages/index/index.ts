import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Breadcrumbs } from "../../../../shared/components/breadcrumbs/breadcrumbs";

@Component({
  selector: 'app-index',
  imports: [RouterLink, Breadcrumbs],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {

  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'NgBootstrap'},
  ];

}
