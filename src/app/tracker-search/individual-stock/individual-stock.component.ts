import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { Router } from '@angular/router';
import { StockSearchService } from '../../stock-search.service';

@Component({
  selector: 'app-individual-stock',
  templateUrl: './individual-stock.component.html',
  styleUrls: ['./individual-stock.component.css'],
})
export class IndividualStockComponent implements OnInit {
  quote: any;
  @Input() quoteInfo: any;
  @Input() companies: any;

  @Output() removeSymbol = new EventEmitter<string>();
  @Output() removeSymbolInfo = new EventEmitter<string>();

  quoteHighPrice: number;

  name: string;
  ticker: string;
  highPrice: number;
  openingPrice: number;
  currentPrice: number;
  percentChange: number;

  arrow: boolean;

  constructor(   private stockSearch: StockSearchService,) {}

  deleteSymbol() {
    this.removeSymbol.emit(this.companies);
  }

  deleteInfo() {
    this.removeSymbolInfo.emit(this.quoteInfo);
  }

  ngOnInit() {
    this.showQuote(this.ticker);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.quoteInfo) {
    //  this.quoteHighPrice = this.quoteInfo['h'];
    //  this.openingPrice = this.quoteInfo['o'];
    //  this.currentPrice = this.quoteInfo['c'];
    //  this.percentChange = this.quoteInfo['dp'];

  
    }




    if (this.percentChange < 0) {
      this.arrow = false;
    } else {
      this.arrow = true;
    }



    if (this.companies) {
      this.name = this.companies['name'];
      this.ticker = this.companies['ticker'];
    }
  }



  showQuote(symbol: string) {
   // this.quote = null;
    this.stockSearch
      .getQuote(symbol)
      .subscribe({
        next: (data: String) => {
         // this.currentQuote['quote'] = data;
          this.quote = data;

          this.currentPrice = this.quote['c'];
          
          this.percentChange = this.quote['dp'];
          this.openingPrice = this.quote['o'];
          this.highPrice = this.quote['h'];



          console.log(this.highPrice);
          //this.quoteInfo.unshift(this.currentQuote['quote']);

        },
        error: (err) => console.log('Error Happened quote'),
      });
  }


  deleteStock() {}

  moreInfo(name: string) {}
}
