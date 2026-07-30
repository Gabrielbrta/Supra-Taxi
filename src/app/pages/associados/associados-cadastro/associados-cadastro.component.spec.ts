import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosCadastroComponent } from './associados-cadastro.component';

describe('AssociadosCadastroComponent', () => {
  let component: AssociadosCadastroComponent;
  let fixture: ComponentFixture<AssociadosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
