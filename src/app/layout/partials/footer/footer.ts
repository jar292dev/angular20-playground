import { Component } from '@angular/core';
import { APP_CONSTANTS } from '../../../core/constants/app.constants';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly app = APP_CONSTANTS;
  readonly currentYear = new Date().getFullYear();

}
