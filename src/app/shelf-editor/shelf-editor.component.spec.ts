import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShelfEditorComponent } from './shelf-editor.component';

describe('ShelfEditorComponent', () => {
  let component: ShelfEditorComponent;
  let fixture: ComponentFixture<ShelfEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShelfEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShelfEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
