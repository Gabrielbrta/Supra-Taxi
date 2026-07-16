import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosVeiculosComponent } from './associados-veiculos.component';

describe('AssociadosVeiculosComponent', () => {
  let component: AssociadosVeiculosComponent;
  let fixture: ComponentFixture<AssociadosVeiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosVeiculosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosVeiculosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
