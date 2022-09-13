import { Component, OnInit } from '@angular/core';
import { takeWhile } from 'rxjs/operators';
import { StockSearchService } from '../stock-search.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Component({
  selector: 'app-tracker-search',
  templateUrl: './tracker-search.component.html',
  styleUrls: ['./tracker-search.component.css'],
})
export class TrackerSearchComponent implements OnInit {
  constructor(
    private stockSearch: StockSearchService,
    private http: HttpClient
  ) {}

  company = {};
  symbol: any = '';
  noSymbol: string = '';

  currentQuote = {};
  quoteInfo: any = [];
  companies: any = [];
  highPrice: number;
  openingPrice: number;
  currentPrice: number;
  percentChange: number;
  quote: any;

  alive: boolean = true;

  stockInfo = [];

  ngOnInit() {
    //this.showQuote();
    //console.log('hello');
    //localStorage.clear();

    for (var i = 0; i < localStorage.length; i++) {
     // if (localStorage.key(i).length < 7) {
        //this.stocks.unshift(localStorage.key(i));
        
        this.findSymbol(localStorage.key(i));
     // }
    }
  }

  stocks: string[] = [];

  stockSearchFunc(stock: string) {
    // if it is in the api
    // if they it is not already in the array
    stock.toUpperCase();

    // push it to the array

    const found = this.stocks.find((obj) => {
      return obj == stock;
    });

    if (found !== undefined) {
      console.log('Stock not found');
    } else {
      this.findSymbol(stock);
    }



  }

  find(stock: string) {
    for (var x = 0; x < this.stocks.length; x++) {
      if (this.stocks[x] == stock) {
        console.log(this.stocks[x]);
        console.log(stock);
        break;
      }
    }
    this.stocks.unshift(stock);
  }

  displayStocks(stock: string) {
    this.clear();
    this.showQuote(stock);
  }

  clear() {
    this.company = {};
    this.symbol = '';
    this.noSymbol = '';

    this.currentQuote = {};
    this.highPrice = 0;
    this.openingPrice = 0;
    this.currentPrice = 0;
    this.percentChange = 0;
    this.quote = null;
  }

  showQuote(symbol: string) {
    this.quote = null;
    this.stockSearch
      .getQuote(this.symbol)
      //.pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (data: String) => {
          this.currentQuote['quote'] = data;
          this.quote = data;

          this.currentPrice = this.quote['c'];
          this.percentChange = this.quote['dp'];
          this.openingPrice = this.quote['o'];
          this.highPrice = this.quote['h'];

          this.quoteInfo.unshift(this.currentQuote['quote']);

          console.log(this.quoteInfo);
          console.log(this.quote['c']);
        },
        error: (err) => console.log('Error Happened quote'),
      });
  }

  findSymbol(stock: string) {
    //   this.company = {};
    //  this.symbol = '';
    this.stockSearch
      .findSymbol(stock)
      //.pipe(takeWhile(() => this.alive))
      .subscribe({
        next: (data: String) => {
          this.company = data;
          this.symbol = this.company['ticker'];

          console.log(this.symbol);
          console.log(this.company);

          // only do this if it is not empty
          if (this.symbol !== undefined) {
            this.companies.unshift(this.company);
            this.stocks.unshift(stock);
            this.showQuote(this.symbol);
            this.noSymbol = '';

            localStorage.setItem(stock, stock);
            console.log('localStorage');
            console.log(localStorage.getItem(stock));
          } else {
            this.noSymbol = 'PLEASE ENTER CORRECT STOCK SYMBOL';
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  deleteSymbol(removeSymbol: string) {
    // remove symbol from list
    console.log(removeSymbol['ticker']);

    localStorage.removeItem(removeSymbol['ticker'].toLowerCase());

    for (var x = 0; x < this.companies.length; x++) {
      if (this.companies[x] == removeSymbol) {
        this.companies.splice(x, 1);
        this.stocks.splice(x, 1);

        // delete in storage as well
      }
    }
  }

  deleteSymbolInfo(removeSymbolInfo: string) {
    // remove symbol info from list
    for (var x = 0; x < this.quoteInfo.length; x++) {
      if (this.quoteInfo[x] == removeSymbolInfo) {
        this.quoteInfo.splice(x, 1);
      }
    }
  }
}
