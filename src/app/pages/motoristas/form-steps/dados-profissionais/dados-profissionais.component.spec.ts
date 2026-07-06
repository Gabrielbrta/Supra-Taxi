import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DadosProfissionaisComponent } from './dados-profissionais.component';

describe('DadosProfissionaisComponent', () => {
  let component: DadosProfissionaisComponent;
  let fixture: ComponentFixture<DadosProfissionaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DadosProfissionaisComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DadosProfissionaisComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
