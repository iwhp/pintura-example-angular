import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilepondExampleComponent } from './filepond-example.component';

describe('FilepondExampleComponent', () => {
  let component: FilepondExampleComponent;
  let fixture: ComponentFixture<FilepondExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilepondExampleComponent]
    });
    fixture = TestBed.createComponent(FilepondExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
