import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookInformationComponent } from './book-information.component';

describe('BookInformationComponent', () => {
  let component: BookInformationComponent;
  let fixture: ComponentFixture<BookInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
