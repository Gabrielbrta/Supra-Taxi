import { Component, inject, OnInit } from '@angular/core';
import { TabsHeader } from '../../../shared/models/forms/TabsHeader';
import { CardComponent } from "../../../shared/components/card/card.component";
import { FormTabsComponent } from "../../../shared/components/form-tabs/form-tabs.component";
import { DadosPessoaisComponent } from '../form-steps/dados-pessoais/dados-pessoais.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { EnderecoComponent } from "../form-steps/endereco/endereco.component";
import { DadosProfissionaisComponent } from "../form-steps/dados-profissionais/dados-profissionais.component";
import { DocumentosComponent } from "../form-steps/documentos/documentos.component";
import { MotoristasService } from '../../../core/services/motoristas.service';
import { CadastroMotoristaForm, CadastroMotoristaDTO, CadastroMotoristaStorage, DocumentItem } from '../../../shared/models/motoristas/cadastroMotoristaDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { Moment } from 'moment';
import moment from 'moment';

@Component({
  selector: 'app-motorista-cadastro',
  imports: [CardComponent, FormTabsComponent, DadosPessoaisComponent, ReactiveFormsModule, ButtonComponent, EnderecoComponent, DadosProfissionaisComponent, DocumentosComponent],
  templateUrl: './motorista-cadastro.component.html',
  styleUrl: './motorista-cadastro.component.scss',
})
export class MotoristaCadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private MotoristaService = inject(MotoristasService);
  private route = inject(ActivatedRoute)
  private router = inject(Router);
  viewOnly: boolean = false; 
  mode: string = '';
  idMotorista: string = this.route.snapshot.paramMap.get('id')!;
  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path ?? '';
    if(path.includes('editar')) {
      this.mode = 'edit';

      const motorista = this.getMotoristaById(this.idMotorista);
      if(!motorista) {
          console.error('Motorista não encontrado');
          return;
      }
      this.patchValueForm(motorista);
    }
    if(path.includes('visualizar')){
      this.viewOnly = true;
      this.form.disable();
      const motorista = this.getMotoristaById(this.idMotorista);
      console.log(motorista);

      if(!motorista) {
          console.error('Motorista não encontrado');
          return;
      }
      this.patchValueForm(motorista);
    }
    this.selectedTab(this.tabs[0].key);
  }
  
  activeTab: string = '';
  initForm() {

  }
  form = this.fb.group({
    dadosPessoais: this.fb.nonNullable.group({
      nomeMotorista: this.fb.control<string>('', Validators.required),
      nomePai: this.fb.control<string>('', Validators.required),
      nomeMae: this.fb.control<string>('', Validators.required),
      cpfMotorista: this.fb.control<string>('', Validators.required),
      rgMotorista: this.fb.control<string>('', Validators.required),
      cnhMotorista: this.fb.control<string>('', Validators.required),
      dataEmissaoCNH: this.fb.control<Moment | string | Date>('', Validators.required),
      dataValidadeCNH: this.fb.control<Moment | string | Date>('',Validators.required),
      nacionalidade: this.fb.control<string>('', Validators.required),
      naturalidade: this.fb.control<string>('', Validators.required),
      estadoCivil: this.fb.control<string | number>('', Validators.required),
      escolaridade: this.fb.control<string | number>('', Validators.required),
      email: this.fb.control<string>('', Validators.email),
      telMotorista: this.fb.control<string | null>(null),
      celMotorista: this.fb.control<string>('', Validators.required)
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
      rct: this.fb.control<string>('', Validators.required),
      rctDataValidade: this.fb.control<Moment | string | Date>('',Validators.required),
      registro: this.fb.control<string | null>(null),
      situacao: this.fb.control<string | number>('', Validators.required),
      observacoes: this.fb.control<string | null>(null)
    }),
    documentos: this.fb.group({
      cnhDocumento: this.fb.control<DocumentItem<File> | null>(null),
      cpf: this.fb.control<DocumentItem<File> | null>(null),
      rg: this.fb.control<DocumentItem<File> | null>(null),
      rct: this.fb.control<DocumentItem<File> | null>(null),
      comprovanteResidencia: this.fb.control<DocumentItem<File> | null>(null),
      antecedentesCriminais: this.fb.control<DocumentItem<File> | null>(null),
      foto: this.fb.control<DocumentItem<File> | null>(null, Validators.required),
    })


  });

  patchValueForm(motorista: CadastroMotoristaStorage) {
    this.form.patchValue({
      dadosPessoais: motorista.dadosPessoais,
      endereco: motorista.endereco,
      dadosProfissionais: motorista.dadosProfissionais,
      documentos: {
        // cnhDocumento: motorista.documentos.cnhDocumento,
        // cpf: motorista.documentos.cpf,
        // rg: motorista.documentos.rg,
        // rct: motorista.documentos.rct,
        // comprovanteResidencia: motorista.documentos.comprovanteResidencia,
        // antecedentesCriminais: motorista.documentos.antecedentesCriminais,
        // foto: motorista.documentos.foto,
      }
    })
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
    }
  ]

  selectedTab(tab: string) {
    this.activeTab = tab;
  }

  back(event: MouseEvent) {
    this.router.navigate(['/motoristas'])
  }

  getMotoristaById(idMotorista: string) {
    const motorista = this.MotoristaService.getMotoristaById(idMotorista);
    return motorista;
  }

  async onSubmit(event: MouseEvent) {
    event.preventDefault();
    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroMotoristaForm), 
      }
      payload.dadosPessoais.dataEmissaoCNH =
        moment(payload.dadosPessoais.dataEmissaoCNH).format('DD/MM/YYYY');

      payload.dadosPessoais.dataValidadeCNH =
        moment(payload.dadosPessoais.dataValidadeCNH).format('DD/MM/YYYY')

      payload.dadosProfissionais.rctDataValidade =
       moment(payload.dadosProfissionais.rctDataValidade).format('DD/MM/YYYY')

    if(this.mode == 'edit'){
      const result = await this.MotoristaService.editMotoristaById(this.idMotorista, payload);
      if(result) {
        alert('Motorista editado com sucesso!');
      } else {
        alert('Ocorreu um erro ao editar motorista!');
      }
    } else {
      const result = await this.MotoristaService.cadastroMotorista(payload, crypto.randomUUID());
      alert(result.status?.message);
    }
    }
  }

}
