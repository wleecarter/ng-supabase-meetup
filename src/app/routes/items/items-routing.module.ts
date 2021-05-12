import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ItemListComponent } from './items-list.component';

const routes: Routes = [
  {
    path: '',
    component: ItemListComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class ItemListRoutingModule {}
