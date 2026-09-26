import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResaleCurrentInventory } from './resale-current-inventory';

describe('ResaleCurrentInventory', () => {
  let component: ResaleCurrentInventory;
  let fixture: ComponentFixture<ResaleCurrentInventory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResaleCurrentInventory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResaleCurrentInventory);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
