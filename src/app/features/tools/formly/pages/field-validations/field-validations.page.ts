import { Component, inject } from '@angular/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from '../../../../../shared/components/output-container/output-container';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { AbstractControl, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';

@Component({
  selector: 'app-field-validations',
  imports: [ReactiveFormsModule, FormlyForm, Breadcrumbs, OutputContainer],
  templateUrl: './field-validations.page.html',
  styleUrl: './field-validations.page.scss',
})
export class FieldValidationsPage {
  private citiesService = inject(CitiesService)
  protected output: any;
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly', url: '/formly' },
    { label: 'Field rows' },
  ];

  form = new UntypedFormGroup({});
  model: any = {}; // Evitar any, tipar con el interfaz de Form
  options: FormlyFormOptions = {};

  // options: FormlyFormOptions = { // Opciones globales del formulario
  //   formState: { // Estado global del formulario que se puede usar para controlar la visibilidad o el comportamiento de los campos
  //     awesomeIsForced: true, // Variable de estado que se puede usar para controlar la visibilidad de los campos
  //   },
  // };

  fields : FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row g-2',
      fieldGroup: [
        {
          className: 'col-12 col-md-3',
          type: 'input',
          key: 'firstName',
          wrappers: ['floating-label'], // Muestra el campo envuelto en este wrapper
          props: {
            label: 'First Name',
            placeholder: 'Introduce tu nombre',
            floatingLabel: true,
            required: true, // Validator Angular
            minLength: 3 // Validator Angular
          },
          validation: {
            messages: {
              required: 'El nombre es obligatorio',  // 👈 sobreescribe el global
            },
          },
        },
        {
          className: 'col-12 col-md-3',
          type: 'input',
          key: 'lastName',
          wrappers: ['floating-label'],
          props: {
            label: 'Last Name',
            placeholder: 'Introduce tu apellido',
            floatingLabel: true,
          },
          // expressions: { // Para condicionar un campo
          //   'props.disabled': '!model.firstName',
          // },
        },
        {
          className: 'col-12 col-md-2',
          type: 'number',
          key: 'number',
          wrappers: ['floating-label'],
          props: {
            label: 'Numero',
            placeholder: 'Introduce un numero',
            floatingLabel: true,
            required: true,
            min: 10,
            max: 100,
            description: 'Description',
          },
        },
        {
          className: 'col-12 col-md-2',
          type: 'input',
          key: 'age',
          wrappers: ['floating-label'],
          props: {
            label: 'Edad',
            type: 'number',
            placeholder: 'Introduce tu edad',
            floatingLabel: true,
            required: true,
          },
          validators: {
            age: {
              expression: (control: AbstractControl) => {
                const val = control.value;
                return val === null || (val >= 18 && val <= 99);
              },
              message: 'La edad debe estar entre 18 y 99 años',
            },
          },
        },
      ],
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

  onReset() {
    this.form.reset();
    this.output = null;
  }

  getProvincias(){
    return [
      { value: 1, label: 'Madrid' },
      { value: 2, label: 'Barcelona' },
      { value: 3, label: 'Valencia' },
    ]
  }
}
