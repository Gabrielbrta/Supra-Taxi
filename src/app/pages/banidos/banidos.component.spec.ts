import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BanidosComponent } from './banidos.component';

describe('BanidosComponent', () => {
  let component: BanidosComponent;
  let fixture: ComponentFixture<BanidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BanidosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BanidosComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
