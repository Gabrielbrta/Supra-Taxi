import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitBarComponent } from './submit-bar.component';

describe('SubmitBarComponent', () => {
  let component: SubmitBarComponent;
  let fixture: ComponentFixture<SubmitBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitBarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
