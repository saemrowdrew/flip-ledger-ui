import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellItem } from './sell-item';

describe('SellItem', () => {
  let component: SellItem;
  let fixture: ComponentFixture<SellItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
