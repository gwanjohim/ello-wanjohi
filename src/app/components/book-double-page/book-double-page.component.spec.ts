import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDoublePageComponent } from './book-double-page.component';

describe('BookDoublePageComponent', () => {
  let component: BookDoublePageComponent;
  let fixture: ComponentFixture<BookDoublePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookDoublePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDoublePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
