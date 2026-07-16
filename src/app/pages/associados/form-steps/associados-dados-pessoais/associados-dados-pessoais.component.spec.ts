import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosDadosPessoaisComponent } from './associados-dados-pessoais.component';

describe('AssociadosDadosPessoaisComponent', () => {
  let component: AssociadosDadosPessoaisComponent;
  let fixture: ComponentFixture<AssociadosDadosPessoaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosDadosPessoaisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosDadosPessoaisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
