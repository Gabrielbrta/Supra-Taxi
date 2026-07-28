import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesCadastroComponent } from './unidades-cadastro.component';

describe('UnidadesCadastroComponent', () => {
  let component: UnidadesCadastroComponent;
  let fixture: ComponentFixture<UnidadesCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadesCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UnidadesCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
