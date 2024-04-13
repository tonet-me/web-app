import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MainComponent} from "./main.component";
import {userCardsResolver} from "@app/modules/main/resolvers/user-cards.resolver";


const routes: Routes = [
  {path: '', component: MainComponent, resolve: {cards: userCardsResolver}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class MainRoutingModule {
}
