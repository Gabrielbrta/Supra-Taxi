import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minItems(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const length = (control.value as unknown[])?.length ?? 0;

        return length >= min
        ? null
        : { minItems: { required: min, actual: length } };
    } 
}