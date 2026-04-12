// switch.type.ts
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldType, FieldTypeConfig, FormlyModule } from '@ngx-formly/core';

@Component({
  template: `
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        [id]="id"
        [formControl]="formControl"
        [formlyAttributes]="field"
      />
      <label class="form-check-label" [for]="id">
        {{ props.label }}
      </label>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    FormlyModule,
  ]
})
export class SwitchFieldType extends FieldType<FieldTypeConfig> {}