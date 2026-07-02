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
import { CadastroMotoristaForm, CadastroMotoristaPayload, DocumentItem } from '../../../shared/models/motoristas/cadastroMotoristaPayload';

@Component({
  selector: 'app-motorista-cadastro',
  imports: [CardComponent, FormTabsComponent, DadosPessoaisComponent, ReactiveFormsModule, ButtonComponent, EnderecoComponent, DadosProfissionaisComponent, DocumentosComponent],
  templateUrl: './motorista-cadastro.component.html',
  styleUrl: './motorista-cadastro.component.scss',
})
export class MotoristaCadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  private MotoristaService = inject(MotoristasService);
  
  ngOnInit(): void {
    this.selectedTab(this.tabs[0].key);
  }
  
  activeTab: string = '';

  form = this.fb.group({
    dadosPessoais: this.fb.nonNullable.group({
      nomeMotorista: ['', Validators.required],
      nomePai: ['', Validators.required],
      nomeMae: ['', Validators.required],
      cpfMotorista: ['', Validators.required],
      rgMotorista: ['', Validators.required],
      cnhMotorista: ['', Validators.required],
      dataEmissaoCNH: [null, Validators.required],
      dataValidadeCNH: [null, Validators.required],
      nacionalidade: ['', Validators.required],
      naturalidade: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      escolaridade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telMotorista: [null],
      celMotorista: ['', Validators.required]
    }),
    endereco: this.fb.group({
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: [null],
      complemento: [null],
      bairro: [null],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    }),

    dadosProfissionais: this.fb.group({
      rct: ['', Validators.required],
      rctDataValidade: [null, Validators.required],
      registro: [null],
      situacao: ['', Validators.required],
      observacoes: [null]
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
