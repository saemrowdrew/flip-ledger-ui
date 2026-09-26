import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryFormAdd } from './inventory-form-add';

describe('InventoryFormAdd', () => {
  let component: InventoryFormAdd;
  let fixture: ComponentFixture<InventoryFormAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryFormAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryFormAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
