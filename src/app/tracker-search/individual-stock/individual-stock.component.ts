import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';

import { Router } from '@angular/router';

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

  constructor() {}

  deleteSymbol() {
    this.removeSymbol.emit(this.companies);
  }

  deleteInfo() {
    this.removeSymbolInfo.emit(this.quoteInfo);
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.quoteInfo) {
      this.quoteHighPrice = this.quoteInfo['h'];
      this.openingPrice = this.quoteInfo['o'];
      this.currentPrice = this.quoteInfo['c'];
      this.percentChange = this.quoteInfo['dp'];

      if (this.percentChange < 0) {
        this.arrow = false;
      } else {
        this.arrow = true;
      }
    }

    if (this.companies) {
      this.name = this.companies['name'];
      this.ticker = this.companies['ticker'];
    }
  }

  deleteStock() {}

  moreInfo(name: string) {}
}
