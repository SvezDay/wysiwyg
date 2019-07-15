import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ItemPage } from './item.page';
import {ItemComponent} from './item.component';
import {UbDirective} from './ub-host.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      { path: '', component: HomePage }
    ])
  ],
  declarations: [HomePage, ItemPage, ItemComponent, UbDirective],
  entryComponents: [ItemComponent, ItemPage]
})
export class HomePageModule {}
