import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { StockSearchService } from '../../../stock-search.service';
import {Location} from '@angular/common'; 

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.css'],
})
export class SentimentComponent implements OnInit {

  ticker: string;
  name: string;
  information: any = [];
  lastThree: any = [];
  sentiment: boolean = false;
  
  constructor(private route: ActivatedRoute, private stockSearch: StockSearchService, private location: Location ) {}

  // Takes in the query parameters when the page is loaded and asigns them to variables
  // Fixes the page navigation so that the url does not show the query paramenter
  // Calls a function that will get api data needed for the page
  ngOnInit() {
   this.route.queryParams.subscribe(
    params => {
      this.ticker =  params['ticker'];
      this.name = params['name'];
    });
    this.location.replaceState('sentiment/'+this.ticker);
    this.getSentimentData(this.ticker);
  }

  // Call the function that does the api call
  // Gets the data from the api call
  getSentimentData(stock: string) {
    this.stockSearch
      .getSentiment(stock)
      .subscribe({
        next: (data: String) => {
          this.information = data;
          this.getLastThree();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Get only the last three peices of data, the three most recent months, if any
  getLastThree () {
    for (var x = 1; x < 4; x++) {
      this.lastThree.unshift(this.information['data'][this.information['data'].length - x]); 
    }
  }


}
