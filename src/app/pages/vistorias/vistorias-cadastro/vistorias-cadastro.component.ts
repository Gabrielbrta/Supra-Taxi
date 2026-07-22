import { Component, OnInit, signal } from '@angular/core';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { OpcaoChecklist } from '../../../shared/models/table/TableCheckList';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TableChecklistComponent } from '../../../shared/components/table-checklist/table-checklist.component';
import { RadioButtonComponent } from "../../../shared/components/radio-button/radio-button.component";
import { RadioOptions } from '../../../shared/models/forms/RadioOptions';
import { TextareaComponent } from "../../../shared/components/textarea/textarea.component";
import { ButtonApprovalComponent } from "../../../shared/components/button-approval/button-approval.component";
import { Moment } from 'moment';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-vistorias-cadastro',
  imports: [
    CardFormBlockComponent, 
    InputComponent, 
    TableChecklistComponent, 
    ReactiveFormsModule, 
    RadioButtonComponent, 
    TextareaComponent, 
    ButtonApprovalComponent,
    ButtonComponent,
    MatTooltipModule
  ],
  templateUrl: './vistorias-cadastro.component.html',
  styleUrl: './vistorias-cadastro.component.scss',
})
export class VistoriasCadastroComponent implements OnInit {
  form: FormGroup;
  selectedButton: boolean | null = null;
  motivoReprovacao = signal<boolean>(false);
  ngOnInit(): void {
    // this.form.disable();
    this.form.valueChanges.subscribe(value => console.log(value))
    this.form.get('dadosVisuais.aprovarVistoria')?.valueChanges
    .subscribe(value => {
      if(value === false) {
        this.showMotivoReprovacao();
      } else {
        this.hideMotivoReprovacao();
      }
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

  aprovarVistoria: RadioOptions[] = [
    { value: true, label: 'aprovado' },
    { value: false, label: 'reprovado' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checklistPneus: this.fb.control<OpcaoChecklist[]>([], Validators.required),
      checklistItems: this.fb.control<OpcaoChecklist[]>([], Validators.required),
      dataVistoria: this.fb.control<Moment | string | Date>('', Validators.required),
      diretorResponsavel: this.fb.control<string>(''),

      dadosVisuais: this.fb.group({
        ladoDireito: this.fb.control<string>('', Validators.required),
        ladoDireitoDescricao: this.fb.control<string>(''),
        ladoEsquerdo: this.fb.control<string>('', Validators.required),
        ladoEsquerdoDescricao: this.fb.control<string>(''),
        paraChoqueDianteiro: this.fb.control<string>('', Validators.required),
        paraChoqueDianteiroDescricao: this.fb.control<string>(''),
        paraChoqueTraseiro: this.fb.control<string>('', Validators.required),
        paraChoqueTraseiroDescricao: this.fb.control<string>(''),
        parteSuperior: this.fb.control<string>('', Validators.required),
        parteSuperiorDescricao: this.fb.control<string>(''),
        motivoReprovacao: this.fb.control<string>(''),
        aprovarVistoria: this.fb.control<boolean | null>(null, Validators.required),
        observacaoGeral: this.fb.control<string>(''),
      })
    });
  }

  approvalClick(event: string) {
    this.selectedButton = true;
    this.hideMotivoReprovacao();
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(true);
  }
  
  hideMotivoReprovacao() {
    this.form.get('dadosVisuais.motivoReprovacao')?.disable();
    this.form.get('dadosVisuais.motivoReprovacao')?.clearValidators();
    this.motivoReprovacao.set(false);
  }

  showMotivoReprovacao() {
    this.form.get('dadosVisuais.motivoReprovacao')?.enable();
    this.form.get('dadosVisuais.motivoReprovacao')?.setValidators([Validators.required]);
    this.motivoReprovacao.set(true);
  }

  reprovedClick(event: string) {
    this.selectedButton = false;
    this.showMotivoReprovacao();
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(false);
  }

  onSubmit(event: Event) {
    console.log(event)
  }
}
