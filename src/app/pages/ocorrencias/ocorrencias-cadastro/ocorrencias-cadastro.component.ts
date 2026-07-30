import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { Moment } from 'moment';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OcorrenciasService } from '../../../core/services/Ocorrencias.service';
import { CadastroOcorrenciasDTO } from '../../../shared/models/ocorrencias/CadastroOcorrenciasDTO';
@Component({
  selector: 'app-ocorrencias-cadastro',
  imports: [ReactiveFormsModule, CardFormBlockComponent, InputComponent, ButtonComponent, TextareaComponent],
  templateUrl: './ocorrencias-cadastro.component.html',
  styleUrl: './ocorrencias-cadastro.component.scss',
})
export class OcorrenciasCadastroComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ocorrenciasService = inject(OcorrenciasService);
  mode: 'create' | 'edit' | 'view' = 'create';
  private idOcorrencia = this.route.snapshot.paramMap.get('id')!;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      usuario: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      dataOcorrencia: this.fb.control<Moment | Date | null>(null, [Validators.required]),
      unidade: this.fb.control<string>('', [Validators.required]),
      descricao: this.fb.control<string>('', [Validators.required, Validators.minLength(5)])
    })
    
    const path = this.route.snapshot.routeConfig?.path ?? '';

    if(path.includes('editar')) {
      this.mode = 'edit';

      const ocorrencia = this.ocorrenciasService.getOcorrenciaById(this.idOcorrencia);

      if(!ocorrencia) {
        console.error('Ocorrência não existe!')
        return;
      }

      this.patchValueForm(ocorrencia)
    }

    if(path.includes('visualizar')) {
      this.mode = 'view'

      const ocorrencia = this.ocorrenciasService.getOcorrenciaById(this.idOcorrencia);

      if(!ocorrencia) {
        console.error('Ocorrência não existe!')
        return;
      }
      this.patchValueForm(ocorrencia);
      this.form.disable();
    }
  }

  patchValueForm(ocorrencia: CadastroOcorrenciasDTO) {
      this.form.patchValue({
          usuario: ocorrencia.usuario,
          unidade: ocorrencia.unidade,
          dataOcorrencia: ocorrencia.dataOcorrencia,
          descricao: ocorrencia.descricao
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
        ...(this.form.getRawValue() as CadastroOcorrenciasDTO), 
      }

      if(this.mode == 'edit'){
          const result = await this.ocorrenciasService.editOcorrenciaById(this.idOcorrencia, payload);
          if(result) {
              alert('Ocorrência editada com sucesso!');
              this.goBack();
            } else {
              alert('Ocorreu um erro ao editar ocorrência!');
          }
        } 
        else {
          const response = await this.ocorrenciasService.cadastroOcorrencias(payload, crypto.randomUUID());
          if(response.status?.message) {
            alert(response.status.message);
            this.goBack();
          }
      }
    }
  }

  goBack() {
    this.router.navigate(['/ocorrencias']);
  }

}
