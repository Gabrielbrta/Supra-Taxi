import { Component } from '@angular/core';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';

@Component({
  selector: 'app-vistorias-cadastro',
  imports: [CardFormBlockComponent, InputComponent],
  templateUrl: './vistorias-cadastro.component.html',
  styleUrl: './vistorias-cadastro.component.scss',
})
export class VistoriasCadastroComponent {}
