import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmByCharListComponent } from './film-by-char-list.component';

describe('FilmByCharListComponent', () => {
  let component: FilmByCharListComponent;
  let fixture: ComponentFixture<FilmByCharListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmByCharListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmByCharListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
