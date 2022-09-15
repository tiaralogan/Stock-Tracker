import { Component, OnInit } from '@angular/core';
import { StockSearchService } from '../stock-search.service';

@Component({
  selector: 'app-tracker-search',
  templateUrl: './tracker-search.component.html',
  styleUrls: ['./tracker-search.component.css'],
})

export class TrackerSearchComponent implements OnInit {
  constructor(private stockSearch: StockSearchService) {}

  company = {};
  symbol: any = '';
  noSymbol: string = '';
  companies: any = [];
  stocks: string[] = [];

  ngOnInit() {
    // Clear any information that is currently in these 
    this.companies = [];
    this.stocks = [];

    // Reads in information from local storage and searches to see if stock exists
    for (var i = localStorage.length + 1; i >= 0; i--) {
        this.findSymbol(localStorage.key(i));
    }

    // Clears any messages when the page is created
    this.noSymbol = '';
  }

  stockSearchFunc(stock: string) {
    // Change what ever was inputed into uppercase. Uppercase tickers/stocks will be used for the entire program
    stock.toUpperCase();

    // Tells us if the searched stock is in the array of stocks that are already being looked at
    // Uses the find function to do the searching
    const found = this.stocks.find((obj) => {
      return obj == stock.toUpperCase();
    });

    // Looking to see if the stock was found or not in the function above
    // If found there will be a message
    // If not found, look for the symbol with the api
    // If not in the api, there will be another message
    if (found !== undefined) {
      this.noSymbol = 'STOCK ALREADY SEARCHED';
    } else {
      this.noSymbol = "";
      this.findSymbol(stock.toUpperCase());
      if (this.symbol == undefined) {
        this.noSymbol = 'PLEASE ENTER CORRECT STOCK SYMBOL';
      } 
    }
  }

  // Sees if the stock parameter is in the stocks array.
  find(stock: string) {
    for (var x = 0; x < this.stocks.length; x++) {
      if (this.stocks[x] == stock) {
        break;
      }
    }
  }

  // Call the function that does the api call
  // Gets the data from the api call
  // Push the information retrieved into variables and local storage if found in api
  findSymbol(stock: string) {
    this.stockSearch
      .findSymbol(stock)
      .subscribe({
        next: (data: String) => {
          this.company = data;
          this.symbol = this.company['ticker'];
          if (this.symbol !== undefined) {
            this.companies.unshift(this.company);
            this.stocks.unshift(this.symbol);
            this.noSymbol = '';
            localStorage.setItem(stock, stock);
          } 
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  // Delete the stock from the stocks list 
  // Remove the information from the stock company list
  // Also remove the stock from the local storage
  deleteSymbol(removeSymbol: string) {
    localStorage.removeItem(removeSymbol['ticker'].toUpperCase());
    for (var x = 0; x < this.companies.length; x++) {
      if (this.companies[x] == removeSymbol) {
        this.companies.splice(x, 1);
        this.stocks.splice(x, 1);
      }
    }
  }

}
