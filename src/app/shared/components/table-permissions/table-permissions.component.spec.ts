import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePermissionsComponent } from './table-permissions.component';

describe('TablePermissionsComponent', () => {
  let component: TablePermissionsComponent;
  let fixture: ComponentFixture<TablePermissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePermissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TablePermissionsComponent);
    component = fixture.componentInstance;
    component.modulos.set(['Dashboard', 'Motoristas']);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});