import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router"; 

import { IndividualStockComponent } from './tracker-search/individual-stock/individual-stock.component';
import { SentimentComponent } from './tracker-search/individual-stock/sentiment/sentiment.component';
import { AppComponent } from './app.component';
import { TrackerSearchComponent } from './tracker-search/tracker-search.component';


const routes: Routes = [
  { path: "", component: TrackerSearchComponent },
  { path: "sentiment/:id", component: SentimentComponent },
  { path: "**", component: TrackerSearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [],
  providers:[]
})
export class AppRoutingModule { }