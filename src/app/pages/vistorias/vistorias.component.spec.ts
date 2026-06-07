import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistoriasComponent } from './vistorias.component';

describe('VistoriasComponent', () => {
  let component: VistoriasComponent;
  let fixture: ComponentFixture<VistoriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistoriasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VistoriasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
