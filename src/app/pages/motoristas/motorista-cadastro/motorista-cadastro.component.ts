import { Component, OnInit } from '@angular/core';
import { TabsHeader } from '../../../shared/models/forms/TabsHeader';
import { CardComponent } from "../../../shared/components/card/card.component";
import { FormTabsComponent } from "../../../shared/components/form-tabs/form-tabs.component";

@Component({
  selector: 'app-motorista-cadastro',
  imports: [CardComponent, FormTabsComponent],
  templateUrl: './motorista-cadastro.component.html',
  styleUrl: './motorista-cadastro.component.scss',
})
export class MotoristaCadastroComponent implements OnInit {

  ngOnInit(): void {
    this.selectedTab(this.tabs[0].key);
  }
  activeTab: string = '';


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
