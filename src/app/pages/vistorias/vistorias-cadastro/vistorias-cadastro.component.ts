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
  viewOnly: boolean = false; 
  mode: 'create' | 'edit' | 'view' = 'create';
  form: FormGroup;
  selectedButton: boolean | null = null;
  motivoReprovacao = signal<boolean>(false);
  private idVistoria: string = this.route.snapshot.paramMap.get('id')!;
  ngOnInit(): void {
    // this.form.disable();
    // this.form.valueChanges.subscribe(value => console.log(value))
    
    this.form.get('dadosVisuais.aprovarVistoria')?.valueChanges
    .subscribe(value => {
      if(value === 0) {
        this.showMotivoReprovacao();
        this.reprovedClick();
      } else {
        this.hideMotivoReprovacao();
        this.approvalClick();
      }
    });

    const path = this.route.snapshot.routeConfig?.path ?? '';

     if(path.includes('editar')) {
      this.mode = 'edit';

      const vistoria = this.getVistoriaById(this.idVistoria);
      if(!vistoria) {
          console.error('Vistoria não encontrado');
          return;
      }
      this.patchValueForm(vistoria);
    }
    if(path.includes('visualizar')){
      this.mode = 'view';
      this.viewOnly = true;
      const vistoria = this.getVistoriaById(this.idVistoria);
      
      if(!vistoria) {
        console.error('Vistoria não encontrada');
        return;
      }
      this.patchValueForm(vistoria);
      this.form.disable();
    }
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

  private toMomentDate(value: Moment | string | Date | null | undefined) {
    if (!value) {
      return null;
    }

    const parsedDate = moment.isMoment(value)
      ? value
      : moment(value, [moment.ISO_8601, 'DD/MM/YYYY', 'YYYY-MM-DD'], true);

    return parsedDate.isValid() ? parsedDate : null;
  }

  patchValueForm(vistoria: CadastroVistoriaDTO) {
      this.form.patchValue({
        id: vistoria.id,
        checklistPneus: vistoria.checklistPneus,
        checklistItems: vistoria.checklistItems,
        dataVistoria: this.toMomentDate(vistoria.dataVistoria) ?? '',
        diretorResponsavel: vistoria.diretorResponsavel,
        unidade: vistoria.unidade,
        rct: vistoria.rct,
        cpest: vistoria.cpest,
    
        veiculo: vistoria.veiculo,
        proprietario: vistoria.proprietario,
        auxiliar: vistoria.auxiliar,
        km: vistoria.km,
        ano: vistoria.ano,
        modelo: vistoria.modelo,
        dadosVisuais: vistoria.dadosVisuais,
      });

      if(
        vistoria.dadosVisuais.aprovarVistoria == false && 
        this.mode === 'view'
      ) {
        this.showMotivoReprovacao();
      }
      
  }

  approvalClick() {
    this.selectedButton = true;
    this.hideMotivoReprovacao();
    this.form.get('dadosVisuais.motivoReprovacao')?.setValue('',{ emitEvent: false });
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(1, { emitEvent: false });
  }
  
  hideMotivoReprovacao() {
    this.form.get('dadosVisuais.motivoReprovacao')?.disable({emitEvent: false});
    this.form.get('dadosVisuais.motivoReprovacao')?.clearValidators();
    this.motivoReprovacao.set(false);
    
  }

  setApprovedOrReproved() {
    const aprovado = this.form.get('dadosVisuais.aprovarVistoria')?.value;
      if (aprovado === 0) {
        this.motivoReprovacao.set(true);
        this.reprovedClick();
      } else {
        this.motivoReprovacao.set(false);
        this.approvalClick();
      }
  }
  
  showMotivoReprovacao() {
    if(this.mode == 'view') {
      this.form.get('dadosVisuais.motivoReprovacao')?.disable({emitEvent: false});
      this.form.get('dadosVisuais.motivoReprovacao')?.clearValidators();
      this.motivoReprovacao.set(true);
      
    }else {
      this.form.get('dadosVisuais.motivoReprovacao')?.enable({emitEvent: false});
      this.form.get('dadosVisuais.motivoReprovacao')?.setValidators([Validators.required]);
      this.motivoReprovacao.set(true);
    }
  }

  reprovedClick() {
    this.selectedButton = false;
    this.showMotivoReprovacao();
    this.form.get('dadosVisuais.aprovarVistoria')?.setValue(0, { emitEvent: false });
  }

  getVistoriaById(idVistoria: string) {
    const vistoria = this.VistoriaService.getVistoriaById(idVistoria);
    return vistoria;
  }

 async onSubmit(event: Event) {
    event.preventDefault();

     if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    if(this.form.valid) {
      const payload = this.form.getRawValue() as CadastroVistoriaDTO;


      if(this.mode == 'edit'){
        const result = await this.VistoriaService.editVistoriaById(this.idVistoria, payload);
          if(result) {
            alert('Vistoria editada com sucesso!');
            this.goBack();
          } else {
            alert('Ocorreu um erro ao editar vistoria!');
          }
        } else {
          const response = await this.VistoriaService.cadastroVistoria(payload, crypto.randomUUID());
          if(response.status?.message) {
            alert(response.status.message);
          }
        }

    }
  }

  goBack() {
    this.router.navigate(['/vistorias']);
  }
}
