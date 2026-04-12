// formly-field.factory.ts
import { FormlyFieldConfig } from "@ngx-formly/core";

export const inputField = (key: string, label: string, overrides?: Partial<FormlyFieldConfig>): FormlyFieldConfig => ({
  key,
  type: 'input',
  props: { label, placeholder: ' ' },
  ...overrides,
});

export const selectField = (key: string, label: string, options: any[], overrides?: Partial<FormlyFieldConfig>): FormlyFieldConfig => ({
  key,
  type: 'select',
  props: { label, placeholder: 'Selecciona...', options },
  ...overrides,
});

export const switchField = (key: string, label: string, overrides?: Partial<FormlyFieldConfig>): FormlyFieldConfig => ({
  key,
  type: 'switch',
  props: { label },
  ...overrides,
});

export const rowGroup = (fields: FormlyFieldConfig[], rowClass = 'row g-3'): FormlyFieldConfig => ({
  wrappers: ['row'],
  fieldGroup: fields,
});

export const rowGroupGap = (fields: FormlyFieldConfig[], rowClass = 'row g-3'): FormlyFieldConfig => ({
  fieldGroupClassName: rowClass,
  fieldGroup: fields,
});