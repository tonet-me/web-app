import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CardComponent} from "@app/modules/card/card.component";
import {singleCardInfoResolver} from "@shared/resolver/single-card-info.resolver";


const routes: Routes = [
  {
    path: ':id',
    title: 'My Tonet | Card Details',
    resolve: {card: singleCardInfoResolver},
    component: CardComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class CardRoutingModule {
}
