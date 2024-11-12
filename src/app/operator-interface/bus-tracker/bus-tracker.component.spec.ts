import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTrackerComponent } from './bus-tracker.component';

describe('BusTrackerComponent', () => {
  let component: BusTrackerComponent;
  let fixture: ComponentFixture<BusTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
