import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotoristaCadastroComponent } from './motorista-cadastro.component';

describe('MotoristaCadastroComponent', () => {
  let component: MotoristaCadastroComponent;
  let fixture: ComponentFixture<MotoristaCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotoristaCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MotoristaCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
