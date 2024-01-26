import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomExampleComponent } from './custom-example.component';

describe('CustomExampleComponent', () => {
  let component: CustomExampleComponent;
  let fixture: ComponentFixture<CustomExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomExampleComponent]
    });
    fixture = TestBed.createComponent(CustomExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
