import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import Moment from "moment";

//const moment = Moment;

@Injectable()
export class StockSearchService {
  date = new Date();
  currentDate: string;
  threeMonthsPrior: string;





  constructor(private http: HttpClient) {
    this.currentDate =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();
    this.date.setMonth(this.date.getMonth() - 3);
    this.threeMonthsPrior =
      this.date.getFullYear() +
      '-' +
      (this.date.getMonth() + 1) +
      '-' +
      this.date.getDate();




this.currentDate = (this.date.getFullYear() + '-' + 

('0' + (this.date.getMonth()+4)).slice(-2) + '-' +

('0' + this.date.getDate()).slice(-2) )
;


this.threeMonthsPrior = (this.date.getFullYear() + '-' + 

('0' + (this.date.getMonth()+1)).slice(-2) + '-' +

('0' + this.date.getDate()).slice(-2) )




  }

  configUrl = 'https://finnhub.io/api/v1/';
  token = '&token=bu4f8kn48v6uehqi3cqg';

  findSymbol(symbol: string) {

    return this.http.get(
      this.configUrl + '/stock/profile2?symbol=' + symbol + this.token
    );
  }

  // Company quote
  getQuote(symbol: string) {
    return this.http.get(
      this.configUrl + 'quote?symbol=' + symbol + this.token
    );
  }

  getSentiment(symbol: string) {
    return this.http.get(
      this.configUrl +


      '/stock/insider-sentiment?symbol='+symbol+'&from=2015-01-12&to='+ this.currentDate+

       // '/stock/insider-sentiment?symbol='+ symbol.toUpperCase() + '&from=' +
       // this.threeMonthsPrior +
      //  '&to=' +
      //  this.currentDate +
        
        this.token
    );
  }
}
