import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TailoringResultComponent } from './tailoring-result.component';

describe('TailoringResultComponent', () => {
  let component: TailoringResultComponent;
  let fixture: ComponentFixture<TailoringResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TailoringResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TailoringResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
