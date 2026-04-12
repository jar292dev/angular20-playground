// nb-typeahead.type.ts
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeahead, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FieldType, FieldTypeConfig, FormlyFieldProps, FormlyModule } from '@ngx-formly/core';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

export interface TypeaheadProps extends FormlyFieldProps {
  searchFn: (term: string) => Observable<any[]>;
  inputFormatter?: (item: any) => string;
  resultFormatter?: (item: any) => string;
}

@Component({
  imports: [
    ReactiveFormsModule,
    FormlyModule,
    NgbTypeaheadModule
  ],
  template: `
    <input
      #instance="ngbTypeahead"
      type="text"
      class="form-control"
      [id]="id"
      [formControl]="formControl"
      [ngbTypeahead]="search"
      [inputFormatter]="inputFormatter"
      [resultFormatter]="resultFormatter"
      [placeholder]="props.placeholder || ''"
      (focus)="onFocus($event)"
      (blur)="onBlur()"
    />
  `,
})
export class NbTypeaheadFieldType extends FieldType<FieldTypeConfig<TypeaheadProps>> {
    @ViewChild('instance', { static: false }) instance!: NgbTypeahead;

    private focus$ = new Subject<string>();
    
    search = (text$: Observable<string>) => {
    const click$ = this.focus$.pipe(
        filter(() => !!this.instance && !this.instance.isPopupOpen()),
        map(() => this.formControl.value ?? '')
    );

    return merge(
        text$.pipe(debounceTime(300), distinctUntilChanged()),
        click$  // sin debounce ni distinctUntilChanged para que el primer clic sea inmediato
    ).pipe(
        switchMap(term => {
  console.log('Buscando:', term);  // comprueba que llega 'Bi' y no ''
  return this.props.searchFn(term);
})
    );
    };

  onFocus(_event: FocusEvent) {
    this.focus$.next(this.formControl.value ?? '');
  }

    get inputFormatter() {
        return this.props.inputFormatter ?? ((item: any) => item);
    }
    get resultFormatter() {
        return this.props.resultFormatter ?? ((item: any) => item);
    }

    onBlur() {
    const value = this.formControl.value;
    // Si el valor no es un objeto con id, es texto libre sin seleccionar → limpiar
    if (!value || typeof value !== 'object' || !value.id) {
        this.formControl.setValue(null);
    }
    }
}