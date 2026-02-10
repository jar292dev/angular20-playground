import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-output-container',
  imports: [],
  templateUrl: './output-container.html',
  styleUrl: './output-container.scss',
})
export class OutputContainer {
  @Input() resultado = '';
}
