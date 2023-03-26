import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  isLoading: boolean = false;
  loadingSubscription!: Subscription;

  constructor(private loader: LoaderService) { }

  ngOnInit() {
    this.loadingSubscription = this.loader.loading$.subscribe((load: boolean) => {
      alert("in here")
      this.isLoading = load;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }
}
