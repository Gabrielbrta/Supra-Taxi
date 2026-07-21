import { Component, OnInit } from '@angular/core';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { OpcaoChecklist } from '../../../shared/models/table/TableCheckList';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableChecklistComponent } from '../../../shared/components/table-checklist/table-checklist.component';
import { RadioButtonComponent } from "../../../shared/components/radio-button/radio-button.component";
import { RadioOptions } from '../../../shared/models/forms/RadioOptions';
import { TextareaComponent } from "../../../shared/components/textarea/textarea.component";

@Component({
  selector: 'app-vistorias-cadastro',
  imports: [CardFormBlockComponent, InputComponent, TableChecklistComponent, ReactiveFormsModule, RadioButtonComponent, TextareaComponent],
  templateUrl: './vistorias-cadastro.component.html',
  styleUrl: './vistorias-cadastro.component.scss',
})
export class VistoriasCadastroComponent implements OnInit {
  form: FormGroup;
  ngOnInit(): void {
    // this.form.disable();
    this.form.valueChanges.subscribe(value => {
      console.log(value);
    })
  }

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

  inspecaoVisualOptions: RadioOptions[] = [
    { value: 'ok', label: 'Ok' },
    { value: 'danificado', label: 'Danificado' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      placa: [''],
      checklistPneus: [[]],
      checklistItems: [[]] ,
      ladoDireito: ['', Validators.required],
      ladoDireitoDescricao: ['', Validators.required],
      ladoEsquerdo: ['', Validators.required],
      ladoEsquerdoDescricao: ['', Validators.required],
      paraChoqueDianteiro: ['', Validators.required],
      paraChoqueDianteiroDescricao: ['', Validators.required],
      paraChoqueTraseiro: ['', Validators.required],
      paraChoqueTraseiroDescricao: ['', Validators.required],
      parteSuperior: ['', Validators.required],
      parteSuperiorDescricao: ['', Validators.required],
    });
  }
}
