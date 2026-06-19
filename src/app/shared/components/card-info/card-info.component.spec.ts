import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoComponent } from './card-info-component';

describe('CardInfoComponent', () => {
  let component: CardInfoComponent;
  let fixture: ComponentFixture<CardInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
