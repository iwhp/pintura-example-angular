import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultsExampleComponent } from './defaults-example.component';

describe('DefaultsExampleComponent', () => {
  let component: DefaultsExampleComponent;
  let fixture: ComponentFixture<DefaultsExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultsExampleComponent]
    });
    fixture = TestBed.createComponent(DefaultsExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
