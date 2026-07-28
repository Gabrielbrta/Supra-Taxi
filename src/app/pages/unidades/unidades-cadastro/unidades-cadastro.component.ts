import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { CardFormBlockComponent } from '../../../shared/components/card-form-block/card-form-block.component';
import { LucideDynamicIcon } from '@lucide/angular';
import { InputComponent } from "../../../shared/components/forms/input/input.component";
import { ButtonComponent } from "../../../shared/components/button/button.component";
import { ActivatedRoute, Router } from '@angular/router';
import { CadastroVistoriaDTO } from '../../../shared/models/vistorias/CadastroVistoriaDTO';
import { CadastroUnidadesDTO } from '../../../shared/models/unidades/CadastroUnidadesDTO';
import { UnidadesService } from '../../../core/services/Unidades.service';

@Component({
  selector: 'app-unidades-cadastro',
  imports: [CardFormBlockComponent, InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './unidades-cadastro.component.html',
  styleUrl: './unidades-cadastro.component.scss',
})
export class UnidadesCadastroComponent {
  form: FormGroup;
  private UnidadeService = inject(UnidadesService);
  private route = inject(ActivatedRoute);
  private router =  inject(Router);
  private idUnidade: string = this.route.snapshot.paramMap.get('id')!;
  mode: 'create' | 'edit' | 'view' = 'create';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      prefixo: this.fb.control<string>(''),
      unidade: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    });

    const path = this.route.snapshot.routeConfig?.path ?? '';

     if(path.includes('editar')) {
      this.mode = 'edit';

      const unidade = this.getUnidadeById(this.idUnidade);
      if(!unidade) {
          console.error('Unidade não encontrado');
          return;
      }
      this.patchValueForm(unidade);
    }

     if(path.includes('visualizar')){
      this.mode = 'view';
      const unidade = this.getUnidadeById(this.idUnidade);
      
      if(!unidade) {
        console.error('Unidade não encontrada');
        return;
      }
      this.patchValueForm(unidade);
      this.form.disable();
    }
  }


  patchValueForm(unidade: CadastroUnidadesDTO) {
        this.form.patchValue({
          id: unidade.id,
          prefixo: unidade.prefixo,
          unidade: unidade.unidade
        });
        
    }

  getUnidadeById(idUnidade: string) {
    const unidade = this.UnidadeService.getUnidadeById(idUnidade)
    return unidade;
  }

  async onSubmit(event: Event) {
     event.preventDefault();

     if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
    }

    if(this.form.valid) {
      const payload = {
        ...(this.form.getRawValue() as CadastroUnidadesDTO), 
      }


      if(this.mode == 'edit'){
        const result = await this.UnidadeService.editUnidadeById(this.idUnidade, payload);
          if(result) {
            alert('Unidade editada com sucesso!');
            this.goBack();
          } else {
            alert('Ocorreu um erro ao editar unidade!');
          }
        } 
        else {
          const response = await this.UnidadeService.cadastroUnidades(payload, crypto.randomUUID());
          if(response.status?.message) {
            alert(response.status.message);
          }
      }

    }
  }

  goBack() {
    this.router.navigate(['/unidades'])
  }
}
