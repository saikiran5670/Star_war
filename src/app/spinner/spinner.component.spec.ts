import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
  let component: SpinnerComponent;
  let fixture: ComponentFixture<SpinnerComponent>;
  let loaderService: LoaderService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerComponent ],
      providers: [ LoaderService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerComponent);
    component = fixture.componentInstance;
    loaderService = TestBed.inject(LoaderService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
});
