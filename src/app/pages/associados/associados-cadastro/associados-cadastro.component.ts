import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { TabsHeader } from '../../../shared/models/forms/TabsHeader';
import moment from 'moment';
import { CardComponent } from '../../../shared/components/card/card.component';
import { FormTabsComponent } from '../../../shared/components/form-tabs/form-tabs.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ProfilePanelComponent } from '../../../shared/components/profile-panel/profile-panel.component';
import { CadastroAssociadoForm, CadastroAssociadoStorage, DocumentItem } from '../../../shared/models/associados/CadastroAssociadoDTO';
import { AssociadosDadosPessoaisComponent } from '../form-steps/associados-dados-pessoais/associados-dados-pessoais.component';
import { AssociadosEnderecoComponent } from '../form-steps/associados-endereco/associados-endereco.component';
import { AssociadosDadosProfissionaisComponent } from '../form-steps/associados-dados-profissionais/associados-dados-profissionais.component';
import { AssociadosDocumentosComponent } from '../form-steps/associados-documentos/associados-documentos.component';
import { SelectOption } from '../../../shared/models/forms/SelectOption';
import { AssociadosVeiculosComponent } from '../form-steps/associados-veiculos/associados-veiculos.component';
import { minItems } from '../../../shared/utils/FormArrayValidator';
import { AssociadosService } from '../../../core/services/Associados.service';

@Component({
  selector: 'app-associados-cadastro',
  imports: [
    CardComponent, 
    FormTabsComponent, 
    ReactiveFormsModule, 
    ButtonComponent, 
    ProfilePanelComponent, 
    AssociadosDadosPessoaisComponent, 
    AssociadosEnderecoComponent,
    AssociadosDadosProfissionaisComponent,
    AssociadosDocumentosComponent,
    AssociadosVeiculosComponent
  ],
  templateUrl: './associados-cadastro.component.html',
  styleUrl: './associados-cadastro.component.scss',
})
export class AssociadosCadastroComponent {
 private fb = inject(FormBuilder);
  private AssociadosService = inject(AssociadosService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  viewOnly: boolean = false; 
  mode: 'create' | 'edit' | 'view' = 'create';
  idAssociado: string = this.route.snapshot.paramMap.get('id')!;
  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path ?? '';
    if(path.includes('editar')) {
      this.mode = 'edit';

      const associado = this.getAssociadoById(this.idAssociado);
      if(!associado) {
          console.error('Associado não encontrado');
          return;
      }
      this.patchValueForm(associado);
    }
    if(path.includes('visualizar')){
      this.mode = 'view';
      this.viewOnly = true;
      this.form.disable();
      const associado = this.getAssociadoById(this.idAssociado);
      if(!associado) {
          console.error('Motorista não encontrado');
          return;
      }
      this.patchValueForm(associado);
    }
    this.selectedTab(this.tabs[0].key);

  }
  
  activeTab: string = '';
  form = this.fb.group({
    dadosPessoais: this.fb.nonNullable.group({
      nomeAssociado: this.fb.control<string>('', Validators.required),
      dataNascimento: this.fb.control<Moment | string | Date>('', Validators.required),
      nomePai: this.fb.control<string>(''),
      nomeMae: this.fb.control<string>(''),
      cpfAssociado: this.fb.control<string>('', Validators.required),
      rgAssociado: this.fb.control<string>('', Validators.required),
      dataExpedicaoRG: this.fb.control<Moment | string | Date>('',Validators.required),
      cnhAssociado: this.fb.control<string>('', Validators.required),
      dataEmissaoCNH: this.fb.control<Moment | string | Date>('', Validators.required),
      dataVencimentoCNH: this.fb.control<Moment | string | Date>('',Validators.required),
      nacionalidade: this.fb.control<string>(''),
      naturalidade: this.fb.control<string>(''),
      estadoCivil: this.fb.control<string | number>('', Validators.required),
      escolaridade: this.fb.control<string | number>(''),
      email: this.fb.control<string>('', Validators.email),
      telAssociado: this.fb.control<string | null>(null),
      celAssociado: this.fb.control<string>('', Validators.required)
    }),
    endereco: this.fb.group({
      cep: this.fb.control<string>('', Validators.required),
      endereco:  this.fb.control<string>('', Validators.required),
      numero:  this.fb.control<string | null>(null),
      complemento: this.fb.control<string | null>(null),
      bairro: this.fb.control<string | null>(null),
      cidade:  this.fb.control<string>('', Validators.required),
      estado:  this.fb.control<string>('', Validators.required)
    }),

    dadosProfissionais: this.fb.group({
      unidades: this.fb.control<SelectOption[]>([], Validators.required),
      cpest: this.fb.control<string>('', Validators.required),
      rct: this.fb.control<string>('', Validators.required),
      rctDataValidade: this.fb.control<Moment | string | Date>(''),
      rctDataEmissao: this.fb.control<Moment | string | Date>(''),
      situacao: this.fb.control<string | number>('', Validators.required),
    }),

    documentos: this.fb.group({
      cnhDocumento: this.fb.control<DocumentItem<File> | null>(null),
      cpf: this.fb.control<DocumentItem<File> | null>(null),
      rg: this.fb.control<DocumentItem<File> | null>(null),
      rct: this.fb.control<DocumentItem<File> | null>(null),
      alvara: this.fb.control<DocumentItem<File> | null>(null),
      cpest: this.fb.control<DocumentItem<File> | null>(null),
      comprovanteResidencia: this.fb.control<DocumentItem<File> | null>(null),
      antecedentesCriminais: this.fb.control<DocumentItem<File> | null>(null),
      foto: this.fb.control<DocumentItem<File> | null>(null, Validators.required),
    }),

    veiculos: this.fb.array<FormGroup>([], {validators: minItems(1)})

  });

  base64ToFile(base64: string, fileName: string, mimeType: string): File {
    const byteString = atob(base64.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    return new File([arrayBuffer], fileName, {
      type: mimeType,
    });
  }

  createVeiculoForm() {
    return this.fb.group({
        placa: this.fb.control('', Validators.required),
        marca: this.fb.control('', Validators.required),
        modelo: this.fb.control('', Validators.required),
        ano: this.fb.control('', Validators.required),
        cor: this.fb.control('', Validators.required),
        chassi: this.fb.control('', Validators.required),
        renavan: this.fb.control('', Validators.required),
        observacoes: this.fb.control('')
      });
  }

  patchValueForm(associado: CadastroAssociadoStorage) {
    this.form.patchValue({
      dadosPessoais: associado.dadosPessoais,
      endereco: associado.endereco,
      dadosProfissionais: associado.dadosProfissionais,
      veiculos: String(associado.veiculos).split(','),
      documentos: {
        // cnhDocumento: associado.documentos.cnhDocumento,
        // cpf: associado.documentos.cpf,
        // rg: associado.documentos.rg,
        // rct: associado.documentos.rct,
        // comprovanteResidencia: associado.documentos.comprovanteResidencia,
        // antecedentesCriminais: associado.documentos.antecedentesCriminais,
        // foto: associado.documentos.foto,
        foto: associado.documentos.foto
        ? {
            ...associado.documentos.foto,
            file: this.base64ToFile(
              associado.documentos.foto.file,
              associado.documentos.foto.fileName!,
              associado.documentos.foto.mimeType!
            )
          }
        : null,
      }
    })

    const veiculosArray = this.form.controls.veiculos;

    veiculosArray.clear();

    associado.veiculos.forEach(veiculo => {
      const grupo = this.createVeiculoForm()

      grupo.patchValue(veiculo);

      veiculosArray.push(grupo);
    });
  }

  get profileImage(): File | null {
    return this.form.controls.documentos.controls.foto.value?.file ?? null;
  }


  tabs: TabsHeader[] = [
    {
      label: 'Dados Pessoais',
      key: 'dados_pessoais'
    },
    {
      label: 'Endereço',
      key: 'endereco'
    },
    {
      label: 'Dados Profissionais',
      key: 'dados_profissionais'
    },
    {
      label: 'Documentos',
      key: 'documentos'
    },
    {
      label: 'Veículos',
      key: 'veiculos'
    }
  ]

  selectedTab(tab: string) {
    this.activeTab = tab;
  }

  back(event: MouseEvent) {
    this.router.navigate(['/associados'])
  }

  getAssociadoById(idAssociado: string) {
    const associado = this.AssociadosService.getAssociadoById(idAssociado);
    return associado;
  }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroAssociadoForm), 
      }
      const dataEmissaoCNH = moment(payload.dadosPessoais.dataEmissaoCNH);
      payload.dadosPessoais.dataEmissaoCNH = dataEmissaoCNH.isValid()
        ? dataEmissaoCNH.toISOString()
        : '';

      const dataVencimentoCNH = moment(payload.dadosPessoais.dataVencimentoCNH);
      payload.dadosPessoais.dataVencimentoCNH = dataVencimentoCNH.isValid()
        ? dataVencimentoCNH.toISOString()
        : '';

      const dataNascimento = moment(payload.dadosPessoais.dataNascimento);
      payload.dadosPessoais.dataNascimento = dataNascimento.isValid()
        ? dataNascimento.toISOString()
        : '';

      const dataExpedicaoRG = moment(payload.dadosPessoais.dataExpedicaoRG);
      payload.dadosPessoais.dataExpedicaoRG = dataExpedicaoRG.isValid()
        ? dataExpedicaoRG.toISOString()
        : '';

      const rctDataValidade = moment(payload.dadosProfissionais.rctDataValidade);
      payload.dadosProfissionais.rctDataValidade = rctDataValidade.isValid()
        ? rctDataValidade.toISOString()
        : '';

      const rctDataEmissao = moment(payload.dadosProfissionais.rctDataEmissao);
      payload.dadosProfissionais.rctDataEmissao = rctDataEmissao.isValid()
        ? rctDataEmissao.toISOString()
        : '';

    if(this.mode == 'edit'){
      const result = await this.AssociadosService.editAssociadoById(this.idAssociado, payload);
        if(result) {
          alert('Associado editado com sucesso!');
        } else {
          alert('Ocorreu um erro ao editar associado!');
        }
      } else {
        const result = await this.AssociadosService.cadastroAssociado(payload, crypto.randomUUID());
        alert(result.status?.message);
      }
    }
  }

  getProgress(control: FormGroup | FormArray): number {
    const controls = control instanceof FormArray
    ? control.controls : Object.values(control.controls);

    if(controls.length === 0) {
      return 0;
    }

    const filledControls = controls.filter(control => {
      const value = control.value;

      return value !== null &&
            value !== '' &&
            value !== undefined;
      }).length;

      return (filledControls / controls.length) * 100 ;
    }

    get progressItems() {
        return [
          {
            label: 'Dados Pessoais',
            progress: this.getProgress(this.form.controls.dadosPessoais)
          },
          {
            label: 'Endereço',
            progress: this.getProgress(this.form.controls.endereco)
          },
          {
            label: 'Dados Profissionais',
            progress: this.getProgress(this.form.controls.dadosProfissionais)
          },
          {
            label: 'Documentos',
            progress: this.getProgress(this.form.controls.documentos)
          },
          {
            label: 'Veículos',
            progress: this.getProgress(this.form.controls.veiculos)
          },
        ]
    
    }

}
