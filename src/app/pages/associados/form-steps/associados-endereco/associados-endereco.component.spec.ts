import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosEnderecoComponent } from './associados-endereco.component';

describe('AssociadosEnderecoComponent', () => {
  let component: AssociadosEnderecoComponent;
  let fixture: ComponentFixture<AssociadosEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosEnderecoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosEnderecoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
