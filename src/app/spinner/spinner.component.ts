import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';
import { SwapiAccessService } from '../services/swapi-access.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(public loader: LoaderService) { }

  ngOnInit() {
    this.loadingSubscription = this.loader.loading$.subscribe((load: boolean) => {
      this.isLoading = load;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
