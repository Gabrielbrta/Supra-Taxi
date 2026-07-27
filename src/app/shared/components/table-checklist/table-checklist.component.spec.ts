import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableChecklistComponent } from './table-checklist.component';

describe('TableChecklistComponent', () => {
  let component: TableChecklistComponent;
  let fixture: ComponentFixture<TableChecklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableChecklistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableChecklistComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
