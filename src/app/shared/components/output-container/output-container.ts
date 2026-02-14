import { JsonPipe } from '@angular/common';
import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-output-container',
  imports: [JsonPipe],
  templateUrl: './output-container.html',
  styleUrl: './output-container.scss',
})
export class OutputContainer {
  @Input() output: any= '';

  isObject = computed(() => {
    const val = this.output;
    if (typeof val === 'object' && val !== null) {
      return true; 
    }
    return false;
  });
}
