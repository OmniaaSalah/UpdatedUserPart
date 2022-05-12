import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdercreatorComponent } from './ordercreator.component';

describe('OrdercreatorComponent', () => {
  let component: OrdercreatorComponent;
  let fixture: ComponentFixture<OrdercreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdercreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdercreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
