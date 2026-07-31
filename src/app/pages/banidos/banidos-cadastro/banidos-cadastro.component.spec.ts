import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanidosCadastroComponent } from './banidos-cadastro.component';

describe('BanidosCadastroComponent', () => {
  let component: BanidosCadastroComponent;
  let fixture: ComponentFixture<BanidosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanidosCadastroComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BanidosCadastroComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
