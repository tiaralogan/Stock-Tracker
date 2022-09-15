import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { StockSearchService } from '../../stock-search.service';

@Component({
  selector: 'app-individual-stock',
  templateUrl: './individual-stock.component.html',
  styleUrls: ['./individual-stock.component.css'],
})

export class IndividualStockComponent implements OnInit {

  @Input() companies: any;

  @Output() removeSymbol = new EventEmitter<string>();
  @Output() removeSymbolInfo = new EventEmitter<string>();

  quote: any;
  name: string;
  ticker: string;
  highPrice: number;
  openingPrice: number;
  currentPrice: number;
  percentChange: number;

  constructor(private stockSearch: StockSearchService,) {}

  // Send the information to send back to tracker search component that needs to be deleted
  deleteSymbol() {
    this.removeSymbol.emit(this.companies);
  }

  ngOnInit() {
    // Call the function to get the stocks quote
    this.showQuote(this.ticker);
  }

  // Detects modifications of input properties
  ngOnChanges(changes: SimpleChanges) {
    if (this.companies) {
      this.name = this.companies['name'];
      this.ticker = this.companies['ticker'];
    }
  }

  // Call the function that does the api call
  // Gets the data from the api call
  showQuote(symbol: string) {
    this.stockSearch
      .getQuote(symbol)
      .subscribe({
        next: (data: String) => {
          this.quote = data;
          this.currentPrice = this.quote['c'];
          this.percentChange = this.quote['dp'];
          this.openingPrice = this.quote['o'];
          this.highPrice = this.quote['h'];
        },
        error: (err) => console.log('Error Happened quote'),
      });
  }

}
