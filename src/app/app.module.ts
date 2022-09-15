import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { StockSearchService } from './stock-search.service';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TrackerSearchComponent } from './tracker-search/tracker-search.component';
import { IndividualStockComponent } from './tracker-search/individual-stock/individual-stock.component';
import { SentimentComponent } from './tracker-search/individual-stock/sentiment/sentiment.component';




@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    TrackerSearchComponent,
    IndividualStockComponent,
    SentimentComponent,
  ],
  bootstrap: [AppComponent],
  providers: [StockSearchService],
})
export class AppModule {}
