import { Component, forwardRef, input, signal, Signal } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { LucideDynamicIcon } from '@lucide/angular';
import { Icons } from '../../../icons/icons';

@Component({
  selector: 'app-input-file',
  imports: [LucideDynamicIcon],
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
  accept = input<string>('');
  required = input(false);
  allowedTypes: string[] = [  
  'application/pdf',
  'image/png',
  'image/jpeg',
];
  inputId = crypto.randomUUID();
  disabled = false;
  fileName = signal<string>('');
  value: File | null = null;
  maxSize: number = 5 * 1024 * 1024; 
  fileState = signal<'empty' | 'validating' | 'success' | 'error'>('empty');
  icons = Icons;

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
    this.fileName.set('');
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
      this.fileState.set('empty');
      return null;
    }
    
    if(this.maxSize && file.size > this.maxSize) {
      this.fileState.set('error');
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
      this.fileState.set('error')
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
  this.fileName.set(value?.file?.name ?? '');

  if (!value?.file) {
    this.fileState.set('empty');
    return;
  }

  this.fileState.set('success');
  }

async onFileChange(event: Event) {
  
  const fileSizeError: string = 'O arquivo deve ter no máximo 5 MB'
  const fileTypeError: string = 'Apenas arquivos PDF, JPEG e PNG são permitidos'
  const fileSignatureError: string = 'O arquivo parece estar corrompido ou não corresponde ao tipo informado.'
  const fileNameSizeError: string = 'O nome do arquivo deve possuir até 50 caracteres.'
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0]
  this.fileState.set('validating');
  
  if(!file) {
    this.clearFile(input);
    this.fileState.set('empty');
      return; 
    }

    const signature = await this.getSignature(file);

    
    if(file.size > this.maxSize) {
      alert(fileSizeError);
      this.clearFile(input);
      this.fileState.set('error')
      return;
    }

    
    if(!this.allowedTypes.includes(file.type)) {
      alert(fileTypeError);
      this.clearFile(input);
      this.fileState.set('error')
      return;
    }

    if(file.name.length > 50) {
      alert(fileNameSizeError)
      this.clearFile(input);
      this.fileState.set('error')
      return;
    }

    const expected = this.signatures[file.type];

    if(expected && !signature.toLowerCase().startsWith(expected)) {
       this.fileState.set('error')
      this.clearFile(input)
      alert(fileSignatureError);
      return;
    }

    this.value = file;
    this.fileName.set(file.name);
    this.onChange({
      file,
      documentType: this.documentType(),
    });
    this.onTouched();
    this.fileState.set('success');
  }

  calculateSize(fileSize: number) : string {
    const base = 1024;
    const kb = fileSize / base;
    const mb = fileSize / (base * base);

    return kb > base ? mb.toFixed(2) +' mb' : kb.toFixed(2) + ' kb' 
  }

  openModal() {

  }
}
