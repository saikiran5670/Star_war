import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

isLoading!: boolean;

  constructor(private loader : LoaderService) { 
    console.log("spinner val", this.loader.loadingSubject.value)

  }

  ngOnInit() {
    console.log("spinner val", this.loader.loadingSubject.value)
    this.loader.loading$.subscribe((a:any) => 
         this.isLoading = a
   )
  }
}