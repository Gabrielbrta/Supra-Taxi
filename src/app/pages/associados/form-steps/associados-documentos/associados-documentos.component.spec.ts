import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociadosDocumentosComponent } from './associados-documentos.component';

describe('AssociadosDocumentosComponent', () => {
  let component: AssociadosDocumentosComponent;
  let fixture: ComponentFixture<AssociadosDocumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociadosDocumentosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AssociadosDocumentosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
