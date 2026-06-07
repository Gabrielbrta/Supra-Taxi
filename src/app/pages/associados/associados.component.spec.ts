import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosComponent } from './associados.component';

describe('AssociadosComponent', () => {
  let component: AssociadosComponent;
  let fixture: ComponentFixture<AssociadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
