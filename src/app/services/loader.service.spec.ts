import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderService]
    });

    loaderService = TestBed.inject(LoaderService);
  });

  it('should show loader', () => {
    loaderService.show();
    loaderService.loading$.subscribe((loading) => {
      expect(loading).toBeTruthy();
    });
  });

  it('should hide loader', () => {
    loaderService.hide();
    loaderService.loading$.subscribe((loading) => {
      expect(loading).toBeFalsy();
    });
  });
});
