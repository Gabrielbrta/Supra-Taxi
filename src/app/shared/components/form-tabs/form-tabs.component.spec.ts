import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTabsComponent } from './form-tabs.component';

describe('FormTabsComponent', () => {
  let component: FormTabsComponent;
  let fixture: ComponentFixture<FormTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTabsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormTabsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
