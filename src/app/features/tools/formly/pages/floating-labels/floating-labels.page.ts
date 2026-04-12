import { Component } from '@angular/core';
import { Breadcrumbs } from '../../../../../shared/components/breadcrumbs/breadcrumbs';
import { OutputContainer } from '../../../../../shared/components/output-container/output-container';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-floating-labels',
  imports: [ReactiveFormsModule, FormlyForm, Breadcrumbs, OutputContainer],
  templateUrl: './floating-labels.page.html',
  styleUrl: './floating-labels.page.scss',
})
export class FloatingLabelsPage {
  protected output: any;
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly', url: '/formly' },
    { label: 'Floating labels' },
  ];

  form = new UntypedFormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};

  // options: FormlyFormOptions = { // Opciones globales del formulario
  //   formState: { // Estado global del formulario que se puede usar para controlar la visibilidad o el comportamiento de los campos
  //     awesomeIsForced: true, // Variable de estado que se puede usar para controlar la visibilidad de los campos
  //   },
  // };

  fields : FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      // wrappers: ['form-field'],
      wrappers: ['floating-label'], // Personalizado
      props: {
        label: 'Nombre',
        placeholder: 'Introduce tu texto 2',
        floatingLabel: true,  // 👈
      },
    },
  ];

  onSubmit(model: any) {
    if(!this.form.valid) {
      alert("Datos no validos");
      return
    }

    this.output = model;
    
    //alert(JSON.stringify(model));
  }

  reset() {
    this.form.reset();
    this.output = null;
  }
}
