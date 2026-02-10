import { Component } from '@angular/core';
import { Breadcrumbs } from "../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../shared/components/output-container/output-container";

@Component({
  selector: 'app-index',
  imports: [Breadcrumbs, OutputContainer],
  templateUrl: './index.html',
  styleUrl: './index.scss',
})
export class Index {

  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Experimental' }
  ];

}
