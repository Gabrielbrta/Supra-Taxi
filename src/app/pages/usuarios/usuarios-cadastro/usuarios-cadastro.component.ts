import { Component, inject, OnInit } from '@angular/core';
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
import { TablePermissionsComponent } from "../../../shared/components/table-permissions/table-permissions.component";
import { PermissionColumn } from '../../../shared/models/table/TablePermissions';
import { CadastroUsuarioDTO } from '../../../shared/models/usuarios/CadastroUsuarioDTO';
import { UsuarioService } from '../../../core/services/Usuarios.service';

@Component({
  selector: 'app-usuarios-cadastro',
  imports: [ReactiveFormsModule, CardFormBlockComponent, InputComponent, ButtonComponent, TextareaComponent, RadioButtonComponent, TablePermissionsComponent],
  templateUrl: './usuarios-cadastro.component.html',
  styleUrl: './usuarios-cadastro.component.scss',
})
export class UsuariosCadastroComponent implements OnInit{
    private route = inject(ActivatedRoute);
  private router = inject(Router);
  private usuariosService = inject(UsuarioService);
  mode: 'create' | 'edit' | 'view' = 'create';
  private idUsuario = this.route.snapshot.paramMap.get('id')!;
  readonly form: FormGroup;

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
    })
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: this.fb.control<string>('', [Validators.required, Validators.minLength(5)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      tipoUsuario: this.fb.control<number>(3, [Validators.required]),
      permissions: this.fb.control<PermissionColumn[]>([], [Validators.required]),
      status: this.fb.control<number>(1, Validators.required)
    })
    
    const path = this.route.snapshot.routeConfig?.path ?? '';

    if(path.includes('editar')) {
      this.mode = 'edit';

      const usuario = this.usuariosService.getUsuarioById(this.idUsuario);

      if(!usuario) {
        console.error('O usuário não existe!')
        return;
      }

      this.patchValueForm(usuario)
    }

    if(path.includes('visualizar')) {
      this.mode = 'view'

      const usuario = this.usuariosService.getUsuarioById(this.idUsuario);

      if(!usuario) {
        console.error('O usuário não existe!')
        return;
      }
      this.patchValueForm(usuario);
      this.form.disable();
    }
  }

  patchValueForm(usuario: CadastroUsuarioDTO) {
      this.form.patchValue({
          nome: usuario.nome,
          tipoUsuario: usuario.tipoUsuario,
          status: usuario.status,
          permissions: usuario.permissions,
          email: usuario.email,
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
        ...(this.form.getRawValue() as CadastroUsuarioDTO), 
      }

      if(this.mode == 'edit'){
          const result = await this.usuariosService.editUsuarioById(this.idUsuario, payload);
          if(result) {
              alert('Usuário editada com sucesso!');
              this.goBack();
            } else {
              alert('Ocorreu um erro ao editar usuário!');
          }
        } 
        else {
          const response = await this.usuariosService.cadastroUsuario(payload, crypto.randomUUID());
          if(response.status?.message) {
            alert(response.status.message);
            this.goBack();
          }
      }
    }
  }

  goBack() {
    this.router.navigate(['/usuarios']);
  }

}
