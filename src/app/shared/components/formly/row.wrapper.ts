import { Component } from "@angular/core";
import { FieldWrapper, FormlyModule } from "@ngx-formly/core";

// row.wrapper.ts
@Component({
  selector: 'formly-wrapper-row',
  standalone: true,
  imports: [FormlyModule],
  template: `
    <div class="row">
      <ng-container #fieldComponent></ng-container>
    </div>
  `,
})
export class RowWrapper extends FieldWrapper {}