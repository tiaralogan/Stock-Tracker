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
  
  constructor(    private route: ActivatedRoute, private stockSearch: StockSearchService, private location: Location ) {

  }

  ngOnInit() {


 

   this.route.queryParams.subscribe(
    params => {
      this.ticker =  params['ticker'];
      this.name = params['name'];
    });

    this.location.replaceState('sentiment/'+this.ticker);

    this.getSentimentData(this.ticker);
    //console.log(this.information);

 


  }


  getSentimentData(stock: string) {
    //   this.company = {};
    //  this.symbol = '';
    this.stockSearch
      .getSentiment(stock)
      //.pipe(takeWhile(() => this.alive))
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




  getLastThree () {


    for (var x = 1; x < 4; x++) {


     


      this.lastThree.unshift(this.information['data'][this.information['data'].length - x]);

   // console.log(this.information['data'][this.information['data'].length - x]);

  // console.log("vewhrytrytdytdrt");
//console.log(this.lastThree);

  }
  }


}
