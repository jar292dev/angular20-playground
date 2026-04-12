import { Component, inject } from '@angular/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../../shared/components/output-container/output-container";
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { CitiesService } from '../../services/cities.service';
import { inputField, rowGroup, rowGroupGap, selectField, switchField } from '../../types/formly-field.factory';

@Component({
  selector: 'app-field-factory',
  imports: [ReactiveFormsModule, FormlyForm, Breadcrumbs, OutputContainer],
  templateUrl: './field-factory.page.html',
  styleUrl: './field-factory.page.scss',
})
export class FieldFactoryPage {
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
      className: 'section-label',
      template: '<hr /><div><strong>Campos generados con inputField:</strong></div>',
    },
    {
      fieldGroupClassName: 'row g-2',
      fieldGroup: [
        inputField('firstName', 'First Name', { className: 'col-md-6' }),
        inputField('lastName', 'Last Name', { className: 'col-md-6' }),
      ]
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Campos generados con inputField y con rowGroup:</strong></div>',
    },
    rowGroupGap([
      inputField('firstName', 'First Name', { className: 'col-md-3' }),
      inputField('lastName', 'Last Name', { className: 'col-md-3' }),
      selectField('estado', 'Estado', this.getEstados(),  { className: 'col-md-3' }), // getEstados devuelve la lista de opciones del desplegable
      switchField('activo', 'Activo', { className: 'col-md-3' })
    ]),
    // {
    //   fieldGroupClassName: 'row g-2',
    //   fieldGroup: [
    //     {
    //       className: 'col-12 col-md-6',
    //       type: 'input',
    //       key: 'firstName',
    //       wrappers: ['floating-label'],
    //       props: {
    //         label: 'First Name',
    //         placeholder: 'Introduce tu nombre',
    //         floatingLabel: true,
    //       },
    //     },
    //     {
    //       className: 'col-12 col-md-6',
    //       type: 'input',
    //       key: 'lastName',
    //       wrappers: ['floating-label'],
    //       props: {
    //         label: 'Last Name',
    //         placeholder: 'Introduce tu apellido',
    //         floatingLabel: true,
    //       },
    //       expressions: {
    //         'props.disabled': '!model.firstName',
    //       },
    //     },
    //   ],
    // },
    // {
    //   className: 'section-label',
    //   template: '<hr /><div><strong>Address:</strong></div>',
    // },
    // {
    //   fieldGroupClassName: 'row g-2',
    //   fieldGroup: [
    //     {
    //       key: 'direccion',
    //       type: 'input',
    //       className: 'col-12',
    //       props: {label: 'Direccion'}
    //     }
    //   ]
    // },
    // {
    //   className: 'section-label',
    //   template: '<hr /><div><strong>Address:</strong></div>',
    // },
    // {
    //   fieldGroupClassName: 'row g-2',
    //   fieldGroup: [
    //     {
    //       className: 'col-12 col-md-2',
    //       type: 'input',
    //       key: 'estado',
    //       wrappers: ['floating-label'],
    //       props: {
    //         label: 'Estado',
    //         placeholder: 'Estado',
    //         floatingLabel: true,
    //       },
    //     },
    //     {
    //       className: 'col-12 col-md-2',
    //       key: 'provincia',
    //       type: 'select',
    //       wrappers: ['floating-label'],
    //       props: {
    //         label: 'Selecciona una provincia',
    //         placeholder: 'Selecciona una provincia',
    //         floatingLabel: true,
    //         options: this.getProvincias()
    //       },
    //     },
    //     {
    //       className: 'col-12 col-md-2',
    //       type: 'number',
    //       key: 'importe',
    //       wrappers: ['floating-label'],
    //       props: {
    //         label: 'Importe',
    //         placeholder: 'Introduce un importe',
    //         floatingLabel: true,
    //         // addonRight: {
    //         //   // class: 'fa fa-euro',
    //         //   text: '$',
    //         // },
    //       },
    //     },
    //   ],
    // },
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

  getEstados(){
    return [
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
    ]

  }
}
