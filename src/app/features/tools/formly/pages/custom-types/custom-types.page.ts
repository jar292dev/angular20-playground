import { Component, inject } from '@angular/core';
import { Breadcrumbs } from "../../../../../shared/components/breadcrumbs/breadcrumbs";
import { OutputContainer } from "../../../../../shared/components/output-container/output-container";
import { FormlyFieldConfig, FormlyForm } from '@ngx-formly/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CitiesService, CitySearchForm } from '../../services/cities.service';
import { CompaniesService } from '../../services/companies.service';

@Component({
  selector: 'app-custom-types',
  imports: [Breadcrumbs, OutputContainer, ReactiveFormsModule, FormlyForm],
  templateUrl: './custom-types.page.html',
  styleUrl: './custom-types.page.scss',
})
export class CustomTypesPage {
  // === Inyeccion ===
  private cityService = inject(CitiesService);
  private companiesService = inject(CompaniesService);


  // === Estado ===

  protected output: any;
  // Migas de pan para la navegación
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Formly', url: '/formly' },
    { label: 'Custom Types' },
  ];

  form = new FormGroup({});

  model: CitySearchForm = {
    city: null,
    onlyCapitals: false
  };

  fields: FormlyFieldConfig[] = [
    {
      key: 'onlyCapitals',
      type: 'switch',
      props: {
        label: 'Solo capitales',
      },
    },
    {
      key: 'city',
      type: 'nb-typeahead',
      props: {
        label: 'Ciudad',
        floatingLabel: true,
        searchFn: (term: string, field: FormlyFieldConfig) => this.cityService.search(term, this.model.onlyCapitals),
        inputFormatter: (item: any) => item.name,
        resultFormatter: (item: any) => item.name,
      },
    },
    {
      key: 'company',
      type: 'nb-typeahead',
      props: {
        label: 'Compañia',
        floatingLabel: true,
        searchFn: (term: string, field: FormlyFieldConfig) => this.companiesService.search(term),
        inputFormatter: (item: any) => item.name,
        resultFormatter: (item: any) => item.name,
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
