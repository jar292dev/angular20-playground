import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FieldWrapper, FormlyModule } from "@ngx-formly/core";

// floating-label.wrapper.ts
@Component({
  selector: 'formly-wrapper-floating-label',
  standalone: true,
  imports: [ReactiveFormsModule, FormlyModule],
  template: `
    <div class="form-floating">
      <ng-container #fieldComponent></ng-container>
      <label [for]="id">{{ props.label }}</label>
    </div>
    @if (showError) {
      <div class="invalid-feedback d-block">
        <formly-validation-message [field]="field" />
      </div>
    }
  `,
})
export class FloatingLabelWrapper extends FieldWrapper {}