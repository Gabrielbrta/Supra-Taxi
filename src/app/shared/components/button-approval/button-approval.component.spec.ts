import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonApprovalComponent } from './button-approval.component';

describe('ButtonApprovalComponent', () => {
  let component: ButtonApprovalComponent;
  let fixture: ComponentFixture<ButtonApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonApprovalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonApprovalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
