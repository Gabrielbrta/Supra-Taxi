import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistoriasCadastroComponent } from './vistorias-cadastro.component';

describe('VistoriasCadastroComponent', () => {
  let component: VistoriasCadastroComponent;
  let fixture: ComponentFixture<VistoriasCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistoriasCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VistoriasCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
