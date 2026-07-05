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
import { CadastroMotoristaForm, CadastroMotoristaPayload, CadastroMotoristaStorage, DocumentItem } from '../../../shared/models/motoristas/cadastroMotoristaPayload';
import { ActivatedRoute } from '@angular/router';
import { Moment } from 'moment';

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
  viewOnly: boolean = false; 
  ngOnInit(): void {
    const path = this.route.snapshot.routeConfig?.path ?? '';
    const idMotorista: string = this.route.snapshot.paramMap.get('id')!;
    if(path.includes('editar')) {
      const motorista = this.getMotoristaById(idMotorista);
      console.log(motorista);

      if(!motorista) {
          console.error('Motorista não encontrado');
          return;
      }
      this.patchValueForm(motorista);
    }
    if(path.includes('visualizar')){
      this.form.disable();
      this.viewOnly = true;
      const motorista = this.getMotoristaById(idMotorista);
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
      dataEmissaoCNH: this.fb.control<Moment | string>('', Validators.required),
      dataValidadeCNH: this.fb.control<Moment | string>('',Validators.required),
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
      rctDataValidade: this.fb.control<Moment | string>('',Validators.required),
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

    const result = await this.MotoristaService.cadastroMotorista(payload, crypto.randomUUID());
    alert(result.status?.message);
    }
  }

}
