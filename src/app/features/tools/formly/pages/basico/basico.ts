import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyForm, FormlyFormOptions } from '@ngx-formly/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { JsonPipe } from '@angular/common';
import { OutputContainer } from "../../../../../shared/components/output-container/output-container";



/*
Tipos de campos a probar
- Texto
- Password
- Textarea
- Checkbox
- Select
- Radio
- Datepicker
- Timepicker
- File
- Switch
- Slider
- Color
- Range
- Autocomplete
- Repeater
- Fieldset
- Tabs
- Accordion
- Wizard
- Stepper
- Array
- Object
- Custom


*/

@Component({
  selector: 'app-basico',
  imports: [ReactiveFormsModule, FormlyForm, Breadcrumbs, JsonPipe, OutputContainer],
  templateUrl: './basico.html',
  styleUrl: './basico.scss',
})
export class Basico {
  protected output: any;
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly', url: '/formly' },
    { label: 'Basico' },
  ];

  form = new FormGroup({});

  model = {
    texto1: "Texto de ejemplo 1",
    texto2: "Texto de ejemplo 2",
    texto3: "Texto de ejemplo 3",
  };

  options: FormlyFormOptions = { // Opciones globales del formulario
    formState: { // Estado global del formulario que se puede usar para controlar la visibilidad o el comportamiento de los campos
      awesomeIsForced: true, // Variable de estado que se puede usar para controlar la visibilidad de los campos
    },
  };

  fields : FormlyFieldConfig[] = [
    {
      key: 'texto1', // Clave que se utiliza para enlazar el campo con el modelo
      type: 'input', // Tipo de campo, en este caso un input de texto
      //className: 'mb-2', // Clase que se aplica al contenedor del campo, en este caso agrega un margen inferior
/*       templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }, */
      hide: false, // Oculta el campo si es true
/*       hideExpression: (model, formState) => {
        return !formState.awesomeIsForced; // Oculta el campo si awesomeIsForced es false
      }, */
      props: { // Propiedades específicas del campo
        placeholder: 'Introduce tu texto 1', // Placeholder que se muestra dentro del input
        description: 'Nunca compartiremos tu texto con nadie más.', // Descripción que se muestra debajo del label
        label: 'Texto 1', // Label que se muestra delante del input
        disabled: false, // Deshabilita el campo si es true
        size: 'sm', // Tamaño del input (sm, md, lg)
        required: false,
        bootstrapOptions: {
          floating: true, // Habilita el estilo de formulario flotante
          stacked: false, // Apila el label sobre el input en lugar de colocarlo a la izquierda
        },
      },
      templateOptions: { // Propiedades específicas del campo
        label: 'Texto 1', // Label que se muestra delante del input
        placeholder: 'Introduce tu texto 1', // Placeholder que se muestra dentro del input
        required: true, // Hace que el campo sea obligatorio
      },
      validation: {
        messages: {
          required: 'Este campo es requerido 1',
        },
      },
    },
    {
      key: 'texto2',
      type: 'input',
      templateOptions: {
        label: 'Texto 2 - requerido',
        placeholder: 'Introduce tu texto 2',
        required: true,
      },
      validation: {
        messages: {
          required: 'Este campo es requerido 2 (texto personalizado)',
        },
      },
    },
    {
      key: 'texto3',
      type: 'input',
      templateOptions: {
        label: 'Texto 3 - Con validación personalizada, requerido',
        placeholder: 'Introduce tu texto 3',
        required: true,
      },
      //validators: [IpValidator], // Validación personalizada que verifica que el texto tenga el formato de una dirección IP
      validation: {
        messages: {
          required: 'Este campo es requerido 3 (texto personalizado)',
        },
      },
    }
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
