import { Component, forwardRef, input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

@Component({
  selector: 'app-input-file',
  imports: [],
  templateUrl: './input-file.component.html',
  styleUrl: './input-file.component.scss',
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputFileComponent),
    multi: true,   
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => InputFileComponent),
    multi: true
  }
]
})
export class InputFileComponent implements ControlValueAccessor, Validator {
  label = input.required<string>();
  documentType = input.required<string>();
  required = input(false);
  allowedTypes: string[] = [  
  'application/pdf',
  'image/png',
  'image/jpeg',
];
  inputId = crypto.randomUUID();
  disabled = false;
  fileName: string = '';
  value: File | null = null;
  maxSize: number = 5 * 1024 * 1024; 

private readonly signatures: Record<string, string> =  {
  'application/pdf': '25 50 44 46',
  'image/png': '89 50 4e 47',
  'image/jpeg': 'ff d8 ff'
};

  private onChange = (_: {
  file: File;
  documentType: string;
}| null) => {};

  private async getSignature(file: File): Promise<string> {
    const buffer = await file.slice(0, 8).arrayBuffer();
    const bytes = new Uint8Array(buffer);

    return [...bytes].map(byte => byte.toString(16).padStart(2, '0')).join(' ');
  }

  private clearFile(input: HTMLInputElement) {
    input.value = '';
    this.value = null;
    this.fileName = '';
    this.onChange(null);
  }

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }



  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value as {
      file: File,
      documentType: string;
    } | null;

    const file = value?.file;

    if(!file) {
      return null;
    }

    if(this.maxSize && file.size > this.maxSize) {
      return {
        maxSize: {
          actual: file.size,
          max: this.maxSize
        }
      }
    }

    if(
      this.allowedTypes.length > 0 &&
      !this.allowedTypes.includes(file.type)

    ){
      return {
        invalidType: true
      };
    }

    return null;
  }

  writeValue(value:{
  file: File;
  documentType: string;
} | null) {
    this.value = value?.file ?? null;
    this.fileName = value?.file?.name ?? '';
  }

async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]

    if(!file) {
      return; 
    }

    const signature = await this.getSignature(file);

    if(file.size > this.maxSize) {
      alert('O arquivo deve ter no máximo 5 MB.');
      this.clearFile(input);
      this.onChange(null);

      return;
    }

    
    if(!this.allowedTypes.includes(file.type)) {
      alert('Apenas arquivos PDF, JPEG e PNG são permitidos.');
      this.clearFile(input);
      this.onChange(null);
      return;
    }

    const expected = this.signatures[file.type];

    if(expected && !signature.toLowerCase().startsWith(expected)) {
     this.clearFile(input)
      this.onChange(null);
      alert('O arquivo parece estar corrompido ou não corresponde ao tipo informado.');
      return;
    }

    this.value = file;
    this.fileName = file.name;
    this.onChange({
      file,
      documentType: this.documentType(),
    });
    this.clearFile(input)
    this.onTouched();
  }
}
