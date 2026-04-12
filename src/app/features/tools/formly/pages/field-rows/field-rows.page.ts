import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../../shared/components/output-container/output-container";
import { CitiesService } from '../../services/cities.service'

@Component({
  selector: 'app-field-rows',
  imports: [ReactiveFormsModule, FormlyForm, Breadcrumbs, OutputContainer],
  templateUrl: './field-rows.page.html',
  styleUrl: './field-rows.page.scss',
})
export class FieldRowsPage {
  private citiesService = inject(CitiesService)
  protected output: any;
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly', url: '/formly' },
    { label: 'Field rows' },
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
      fieldGroupClassName: 'row g-2',
      fieldGroup: [
        {
          className: 'col-12 col-md-6',
          type: 'input',
          key: 'firstName',
          wrappers: ['floating-label'],
          props: {
            label: 'First Name',
            placeholder: 'Introduce tu nombre',
            floatingLabel: true,
          },
        },
        {
          className: 'col-12 col-md-6',
          type: 'input',
          key: 'lastName',
          wrappers: ['floating-label'],
          props: {
            label: 'Last Name',
            placeholder: 'Introduce tu apellido',
            floatingLabel: true,
          },
          expressions: {
            'props.disabled': '!model.firstName',
          },
        },
      ],
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Address:</strong></div>',
    },
    {
      fieldGroupClassName: 'row g-2',
      fieldGroup: [
        {
          key: 'direccion',
          type: 'input',
          className: 'col-12',
          props: {label: 'Direccion'}
        }
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Address:</strong></div>',
    },
    {
      fieldGroupClassName: 'row g-2',
      fieldGroup: [
        {
          className: 'col-12 col-md-2',
          type: 'input',
          key: 'estado',
          wrappers: ['floating-label'],
          props: {
            label: 'Estado',
            placeholder: 'Estado',
            floatingLabel: true,
          },
        },
        {
          className: 'col-12 col-md-2',
          key: 'provincia',
          type: 'select',
          wrappers: ['floating-label'],
          props: {
            label: 'Selecciona una provincia',
            placeholder: 'Selecciona una provincia',
            floatingLabel: true,
            options: this.getProvincias()
          },
        },
        {
          className: 'col-12 col-md-2',
          type: 'number',
          key: 'importe',
          wrappers: ['floating-label'],
          props: {
            label: 'Importe',
            placeholder: 'Introduce un importe',
            floatingLabel: true,
            // addonRight: {
            //   // class: 'fa fa-euro',
            //   text: '$',
            // },
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

  reset() {
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
