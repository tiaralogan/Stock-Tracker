import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StockSearchService {

  date = new Date();
  currentDate: string;
  threeMonthsPrior: string;

  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  // Gets the current date in the correct format needed for the api call
  constructor(private http: HttpClient) {
    this.currentDate = (this.date.getFullYear() + '-' + 
    ('0' + (this.date.getMonth()+1)).slice(-2) + '-' +
    ('0' + this.date.getDate()).slice(-2) );
  }

  // Api call to search the SYMBOL
  findSymbol(symbol: string) {
    return this.http.get(
      this.configUrl + '/stock/profile2?symbol=' + symbol + this.token
    );
  }

  // Api call to get the api COMPANY QUOTE
  getQuote(symbol: string) {
    return this.http.get(
      this.configUrl + 'quote?symbol=' + symbol + this.token
    );
  }

  // Api call to get a companies SENTIMENT DATA
  // Used really old date so that I can pick data up even if it is a little far off
  getSentiment(symbol: string) {
    return this.http.get(
      this.configUrl + '/stock/insider-sentiment?symbol=' + symbol + '&from=2015-01-12&to=' + this.currentDate + this.token
    );
  }
}
