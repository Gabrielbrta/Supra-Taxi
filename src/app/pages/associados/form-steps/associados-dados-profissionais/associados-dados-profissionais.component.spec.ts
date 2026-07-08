import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosDadosProfissionaisComponent } from './associados-dados-profissionais.component';

describe('AssociadosDadosProfissionaisComponent', () => {
  let component: AssociadosDadosProfissionaisComponent;
  let fixture: ComponentFixture<AssociadosDadosProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosDadosProfissionaisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosDadosProfissionaisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
