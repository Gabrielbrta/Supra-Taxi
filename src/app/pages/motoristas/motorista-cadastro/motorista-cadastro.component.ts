import { Component, inject, OnInit } from '@angular/core';
import { TabsHeader } from '../../../shared/models/forms/TabsHeader';
import { CardComponent } from "../../../shared/components/card/card.component";
import { FormTabsComponent } from "../../../shared/components/form-tabs/form-tabs.component";
import { DadosPessoaisComponent } from '../form-steps/dados-pessoais/dados-pessoais.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-motorista-cadastro',
  imports: [CardComponent, FormTabsComponent, DadosPessoaisComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './motorista-cadastro.component.html',
  styleUrl: './motorista-cadastro.component.scss',
})
export class MotoristaCadastroComponent implements OnInit {
  private fb = inject(FormBuilder);
  
  ngOnInit(): void {
    this.selectedTab(this.tabs[0].key);

    this.form.get('dadosPessoais.nomeMotorista')?.valueChanges.subscribe(value => {
      console.log(value);
    })
  }
  
  activeTab: string = '';

  form = this.fb.group({
    dadosPessoais: this.fb.group({
      nomeMotorista: ['', Validators.required],
      nomePai: ['', Validators.required],
      nomeMae: ['', Validators.required],
      cpfMotorista: ['', Validators.required],
      rgMotorista: ['', Validators.required],
      cnhMotorista: ['', Validators.required],
      dataEmissaoCNH: ['', Validators.required],
      dataValidadeCNH: ['', Validators.required],
      nacionalidade: ['', Validators.required],
      naturalidade: ['', Validators.required],
      estadoCivil: ['', Validators.required],
      escolaridade: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telMotorista: ['', Validators.required],
      celMotorista: ['', Validators.required]
    }),
    endereco: this.fb.group({
      cep: ['', Validators.required],
      endereco: ['', Validators.required],
      numero: ['', Validators.required],
      complemento: [''],
      bairro: ['', Validators.required],
      cidade: ['', Validators.required],
      estado: ['', Validators.required]
    }),

    dadosProfissionais: this.fb.group({
      rct: ['', Validators.required],
      rctDataValidade: ['', Validators.required],
      registro: ['', Validators.required],
      situacao: ['', Validators.required],
      observacoes: ['']
    }),
    documentos: this.fb.group({
      cnhDocumento: [''],
      cpf: [''],
      rg: [''],
      rct: [''],
      comprovanteResidencia: [''],
      antecedentesCriminais: [''],
      foto3x4: [''],
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

}
