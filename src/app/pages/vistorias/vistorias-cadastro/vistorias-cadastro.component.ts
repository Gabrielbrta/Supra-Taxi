import { Component } from '@angular/core';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { OpcaoChecklist } from '../../../shared/models/table/TableCheckList';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableChecklistComponent } from '../../../shared/components/table-checklist/table-checklist.component';

@Component({
  selector: 'app-vistorias-cadastro',
  imports: [CardFormBlockComponent, InputComponent, TableChecklistComponent],
  templateUrl: './vistorias-cadastro.component.html',
  styleUrl: './vistorias-cadastro.component.scss',
})
export class VistoriasCadastroComponent {
  form: FormGroup;

   listaPosicoes: string[] = [
    'Dianteiro Direito',
    'Dianteiro Esquerdo',
    'Traseiro Direito',
    'Traseiro Esquerdo',
    'Estepe'
  ];

  listaOpcoes: OpcaoChecklist[] = [
    { key: 'ok', label: 'OK' },
    { key: 'meia_vida', label: '1/2 VIDA' },
    { key: 'careca', label: 'CARECA' }
  ];

   listaPosicoesItems: string[] = [
    'Banco',
    'Teto',
    'Luzes Internas',
    'Odor',
    'Carpetes',
    'Forros de Porta',
    'Ar Condicionado',
    'Cinto'
  ];

  listaOpcoesItems: OpcaoChecklist[] = [
    { key: 'ok', label: 'Perfeito estado' },
    { key: 'aceitavel', label: 'Aceitável' },
    { key: 'pessima', label: 'Más condições' }
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      placa: [''],
      checklistPneus: [[]],
      checklistItems: [[]] 
    });
  }
}
