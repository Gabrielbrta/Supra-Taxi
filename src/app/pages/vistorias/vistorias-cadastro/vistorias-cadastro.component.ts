import { Component, EventEmitter, inject, OnInit, signal } from '@angular/core';
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
import { SubmitBarComponent } from "../../../shared/components/submit-bar/submit-bar.component";
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { CadastroVistoriaDTO } from '../../../shared/models/vistorias/CadastroVistoriaDTO';
import { VistoriaService } from '../../../core/services/Vistorias.service';

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
    MatTooltipModule,
    SubmitBarComponent
],
  templateUrl: './vistorias-cadastro.component.html',
  styleUrl: './vistorias-cadastro.component.scss',
})
export class VistoriasCadastroComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  private VistoriaService = inject(VistoriaService);

  form: FormGroup;
  selectedButton: boolean | null = null;
  motivoReprovacao = signal<boolean>(false);
  ngOnInit(): void {
    // this.form.disable();
    // this.form.valueChanges.subscribe(value => console.log(value))
    this.form.get('dadosVisuais.aprovarVistoria')?.valueChanges
    .subscribe(value => {
      if(value === 0) {
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
    { value: 1, label: 'aprovado' },
    { value: 0, label: 'reprovado' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checklistPneus: this.fb.control<OpcaoChecklist[]>([], Validators.required),
      checklistItems: this.fb.control<OpcaoChecklist[]>([], Validators.required),

      dataVistoria: this.fb.control<Moment | string | Date>('', Validators.required),
      diretorResponsavel: this.fb.control<string>(''),
      unidade: this.fb.control<string>('', Validators.required),
      rct: this.fb.control<string>('', Validators.required),
      cpest: this.fb.control<string>('', Validators.required),
      
      veiculo: this.fb.control<string>('', Validators.required),
      proprietario: this.fb.control<string>('', Validators.required),
      auxiliar: this.fb.control<string>(''),
      km: this.fb.control<string>('', Validators.required),
      ano: this.fb.control<string>(''),
      modelo: this.fb.control<string>(''),
      

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
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(1, { emitEvent: false });
  }
  
  hideMotivoReprovacao() {
    this.form.get('dadosVisuais.motivoReprovacao')?.disable({emitEvent: false});
    this.form.get('dadosVisuais.motivoReprovacao')?.clearValidators();
    this.motivoReprovacao.set(false);
  }

  showMotivoReprovacao() {
    this.form.get('dadosVisuais.motivoReprovacao')?.enable({emitEvent: false});
    this.form.get('dadosVisuais.motivoReprovacao')?.setValidators([Validators.required]);
    this.motivoReprovacao.set(true);
  }

  reprovedClick(event: string) {
    this.selectedButton = false;
    this.showMotivoReprovacao();
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(0, { emitEvent: false });
  }

 async onSubmit(event: Event) {
    event.preventDefault();

     if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroVistoriaDTO), 
      }
      payload.dataVistoria =
        moment(payload.dataVistoria).format('DD/MM/YYYY');


        const response = await this.VistoriaService.cadastroVistoria(payload, crypto.randomUUID());
        if(response.status?.message) {
          alert(response.status.message);
        }
    }

    console.log(this.form.value)
  }

  goBack() {
    this.router.navigate(['/vistorias']);
  }
}
