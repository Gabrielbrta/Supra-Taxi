import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OcorrenciasService } from '../../../core/services/Ocorrencias.service';
import { Moment } from 'moment';
import { CadastroOcorrenciasDTO } from '../../../shared/models/ocorrencias/CadastroOcorrenciasDTO';
import { BanidosService } from '../../../core/services/Banidos.service';
import { CadastroBanidosDTO } from '../../../shared/models/banidos/CadastroBanidosDTO';

@Component({
  selector: 'app-banidos-cadastro',
  imports: [ReactiveFormsModule, CardFormBlockComponent, InputComponent, ButtonComponent, TextareaComponent],
  templateUrl: './banidos-cadastro.component.html',
  styleUrl: './banidos-cadastro.component.scss',
})
export class BanidosCadastroComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private banidosService = inject(BanidosService);
  mode: 'create' | 'edit' | 'view' = 'create';
  private idBanimento = this.route.snapshot.paramMap.get('id')!;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: this.fb.control<string>('', [Validators.required]),
      dataBanimento: this.fb.control<Moment | Date | null>(null, [Validators.required]),
      cpf: this.fb.control<string>('', [Validators.required,Validators.minLength(11)]),
      rg: this.fb.control<string>('', [Validators.required, Validators.minLength(9)]),
      motivoBanimento: this.fb.control<string>('', [Validators.required, Validators.minLength(5)])
    })
    
    const path = this.route.snapshot.routeConfig?.path ?? '';

    if(path.includes('editar')) {
      this.mode = 'edit';

      const banimento = this.banidosService.getBanimentoById(this.idBanimento);

      if(!banimento) {
        console.error('Banimento não existe!')
        return;
      }

      this.patchValueForm(banimento)
    }

    if(path.includes('visualizar')) {
      this.mode = 'view'

      const banimento = this.banidosService.getBanimentoById(this.idBanimento);

      if(!banimento) {
        console.error('Banimento não existe!')
        return;
      }
      this.patchValueForm(banimento);
      this.form.disable();
    }
  }

  patchValueForm(banimento: CadastroBanidosDTO) {
      this.form.patchValue({
          nome: banimento.nome,
          rg: banimento.rg,
          cpf: banimento.cpf,
          dataBanimento: banimento.dataBanimento,
          motivoBanimento: banimento.motivoBanimento,
      })
  }


  async onSubmit(event: Event){
    event.preventDefault();
  
      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroBanidosDTO), 
      }

      if(this.mode == 'edit'){
          const result = await this.banidosService.editBanimentoById(this.idBanimento, payload);
          if(result) {
              alert('Banimento editado com sucesso!');
              this.goBack();
            } else {
              alert('Ocorreu um erro ao editar banimento!');
          }
        } 
        else {
          const response = await this.banidosService.cadastroBanimento(payload, crypto.randomUUID());
          if(response.status?.message) {
            alert(response.status.message);
            this.goBack();
          }
      }
    }
  }

  goBack() {
    this.router.navigate(['/banidos']);
  }
}
