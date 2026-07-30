import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcorrenciasCadastroComponent } from './ocorrencias-cadastro.component';

describe('OcorrenciasCadastroComponent', () => {
  let component: OcorrenciasCadastroComponent;
  let fixture: ComponentFixture<OcorrenciasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcorrenciasCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcorrenciasCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
