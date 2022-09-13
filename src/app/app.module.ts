import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
//import { Routes, RouterModule } from '@angular/router';
import { StockSearchService } from './stock-search.service';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { TrackerSearchComponent } from './tracker-search/tracker-search.component';
import { IndividualStockComponent } from './tracker-search/individual-stock/individual-stock.component';
import { SentimentComponent } from './tracker-search/individual-stock/sentiment/sentiment.component';

import { AppRoutingModule } from "./app-routing.module";

//const routes: Routes = [

//];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    //RouterModule.forRoot(routes),
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
  //exports: [RouterModule],
})
export class AppModule {}
