import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgeIconComponent } from './badge-icon.component';

describe('BadgeIconComponent', () => {
  let component: BadgeIconComponent;
  let fixture: ComponentFixture<BadgeIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeIconComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
