import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFormBlockComponent } from './card-form-block.component';

describe('CardFormBlockComponent', () => {
  let component: CardFormBlockComponent;
  let fixture: ComponentFixture<CardFormBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFormBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFormBlockComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
