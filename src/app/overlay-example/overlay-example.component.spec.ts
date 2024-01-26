import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayExampleComponent } from './overlay-example.component';

describe('OverlayExampleComponent', () => {
  let component: OverlayExampleComponent;
  let fixture: ComponentFixture<OverlayExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OverlayExampleComponent]
    });
    fixture = TestBed.createComponent(OverlayExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
