import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { InputComponent } from '../../../shared/components/forms/input/input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OcorrenciasService } from '../../../core/services/Ocorrencias.service';
import { Moment } from 'moment';
import { CadastroOcorrenciasDTO } from '../../../shared/models/ocorrencias/CadastroOcorrenciasDTO';
import { RadioButtonComponent } from '../../../shared/components/radio-button/radio-button.component';

@Component({
  selector: 'app-usuarios-cadastro',
  imports: [ReactiveFormsModule, CardFormBlockComponent, InputComponent, ButtonComponent, TextareaComponent, RadioButtonComponent],
  templateUrl: './usuarios-cadastro.component.html',
  styleUrl: './usuarios-cadastro.component.scss',
})
export class UsuariosCadastroComponent {
    private route = inject(ActivatedRoute);
  private router = inject(Router);
  private ocorrenciasService = inject(OcorrenciasService);
  mode: 'create' | 'edit' | 'view' = 'create';
  private idOcorrencia = this.route.snapshot.paramMap.get('id')!;
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      // dataOcorrencia: this.fb.control<Moment | Date | null>(null, [Validators.required]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      tipoUsuario: this.fb.control<string>('', [Validators.required])
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
