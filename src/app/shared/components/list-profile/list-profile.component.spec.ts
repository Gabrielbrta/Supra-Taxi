import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfileComponent } from './list-profile.component';

describe('ListProfileComponent', () => {
  let component: ListProfileComponent;
  let fixture: ComponentFixture<ListProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListProfileComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
