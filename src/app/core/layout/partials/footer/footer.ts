import { Component } from '@angular/core';
import { APP_METADATA } from '../../../constants/app-metadata.constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly app = APP_METADATA;
  readonly currentYear = new Date().getFullYear();

}
