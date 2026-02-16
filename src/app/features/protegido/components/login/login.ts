import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormlyForm, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  @Input({ required: true }) model: any;
  @Input() loading = signal(false);
  @Output() save = new EventEmitter<any>();

  form = new FormGroup({});

  fields : FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email',
        placeholder: 'Enter email',
        required: true,
      },
      validation: {
        messages: {
          required: 'Email is required.',
        },
      },
    },
    {
      key: 'password',
      type: 'input',
      templateOptions: {
        label: 'Password',
        type: 'password',
        placeholder: 'Enter password',
        required: true,
      },
      validation: {
        messages: {
          required: 'Password is required.',
        },
      },
    }
  ]

  onSubmit() {
    if (this.form.valid) {
      console.log('Form submitted:', this.model);
      this.save.emit({ ...this.model });
    }
  }

  reset() {
    this.form.reset();
  }
}
