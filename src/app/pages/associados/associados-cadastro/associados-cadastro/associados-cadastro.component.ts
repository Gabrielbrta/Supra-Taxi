import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import { CadastroMotoristaForm, DocumentItem } from '../../../../shared/models/motoristas/cadastroMotoristaDTO';
import { TabsHeader } from '../../../../shared/models/forms/TabsHeader';
import moment from 'moment';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { FormTabsComponent } from '../../../../shared/components/form-tabs/form-tabs.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ProfilePanelComponent } from '../../../../shared/components/profile-panel/profile-panel.component';
import { CadastroAssociadoForm } from '../../../../shared/models/associados/CadastroAssociadoDTO';
import { AssociadosDadosPessoaisComponent } from '../../form-steps/associados-dados-pessoais/associados-dados-pessoais.component';
import { AssociadosEnderecoComponent } from '../../form-steps/associados-endereco/associados-endereco.component';
import { AssociadosDadosProfissionaisComponent } from '../../form-steps/associados-dados-profissionais/associados-dados-profissionais.component';
import { AssociadosDocumentosComponent } from '../../form-steps/associados-documentos/associados-documentos.component';
import { SelectOption } from '../../../../shared/models/forms/SelectOption';
import { AssociadosVeiculosComponent } from '../../form-steps/associados-veiculos/associados-veiculos.component';

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
  // private MotoristaService = inject(MotoristasService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  viewOnly: boolean = false; 
  mode: string = '';
  idMotorista: string = this.route.snapshot.paramMap.get('id')!;
  ngOnInit(): void {
    this.form.valueChanges.subscribe(value => {
      console.log(value.dadosProfissionais?.unidades)
    })
    const path = this.route.snapshot.routeConfig?.path ?? '';
    // if(path.includes('editar')) {
    //   this.mode = 'edit';

    //   // const motorista = this.getMotoristaById(this.idMotorista);
    //   if(!motorista) {
    //       console.error('Motorista não encontrado');
    //       return;
    //   }
    //   this.patchValueForm(motorista);
    // }
    // if(path.includes('visualizar')){
    //   this.viewOnly = true;
    //   this.form.disable();
    //   // const motorista = this.getMotoristaById(this.idMotorista);
    //   console.log(motorista);

    //   if(!motorista) {
    //       console.error('Motorista não encontrado');
    //       return;
    //   }
    //   this.patchValueForm(motorista);
    // }
    this.selectedTab(this.tabs[0].key);

  }
  
  activeTab: string = '';
  initForm() {

  }
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

    veiculos: this.fb.group({
      placa: this.fb.control<string>('', Validators.required),
      marca: this.fb.control<string>('', Validators.required),
      modelo: this.fb.control<string>('', Validators.required),
      ano: this.fb.control<string>('', Validators.required),
      cor: this.fb.control<string>('', Validators.required),
      chassi: this.fb.control<string>('', Validators.required),
      renavan: this.fb.control<string>('', Validators.required),
      observacoes: this.fb.control<string>('', Validators.required)
    })


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

  // patchValueForm(motorista: CadastroMotoristaStorage) {
  //   this.form.patchValue({
  //     dadosPessoais: motorista.dadosPessoais,
  //     endereco: motorista.endereco,
  //     dadosProfissionais: motorista.dadosProfissionais,
  //     documentos: {
  //       // cnhDocumento: motorista.documentos.cnhDocumento,
  //       // cpf: motorista.documentos.cpf,
  //       // rg: motorista.documentos.rg,
  //       // rct: motorista.documentos.rct,
  //       // comprovanteResidencia: motorista.documentos.comprovanteResidencia,
  //       // antecedentesCriminais: motorista.documentos.antecedentesCriminais,
  //       // foto: motorista.documentos.foto,
  //       foto: motorista.documentos.foto
  //       ? {
  //           ...motorista.documentos.foto,
  //           file: this.base64ToFile(
  //             motorista.documentos.foto.file,
  //             motorista.documentos.foto.fileName!,
  //             motorista.documentos.foto.mimeType!
  //           )
  //         }
  //       : null,
  //     }
  //   })
  // }

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
    this.router.navigate(['/motoristas'])
  }

  // getMotoristaById(idMotorista: string) {
  //   const motorista = this.MotoristaService.getMotoristaById(idMotorista);
  //   return motorista;
  // }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroAssociadoForm), 
      }
      payload.dadosPessoais.dataEmissaoCNH =
        moment(payload.dadosPessoais.dataEmissaoCNH).format('DD/MM/YYYY');

      payload.dadosPessoais.dataVencimentoCNH =
        moment(payload.dadosPessoais.dataVencimentoCNH).format('DD/MM/YYYY')

      payload.dadosProfissionais.rctDataValidade =
       moment(payload.dadosProfissionais.rctDataValidade).format('DD/MM/YYYY')

    // if(this.mode == 'edit'){
      // const result = await this.MotoristaService.editMotoristaById(this.idMotorista, payload);
      // if(result) {
      //   alert('Motorista editado com sucesso!');
      // } else {
      //   alert('Ocorreu um erro ao editar motorista!');
      // }
    // } else {
      // const result = await this.MotoristaService.cadastroMotorista(payload, crypto.randomUUID());
      // alert(result.status?.message);
    // }
    }
  }

  getProgress(group: FormGroup): number {
    const controls = Object.values(group.controls);

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
            progress: 0
          },
        ]
    
    }

}
