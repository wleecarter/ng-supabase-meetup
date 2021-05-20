import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AddEditItemComponent } from './add-edit-item/add-edit-item.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './items-list.component';
import { ItemListRoutingModule } from './items-routing.module';
import { ItemsService } from './items.service';

@NgModule({
  declarations: [AddEditItemComponent, ItemListComponent, ItemComponent],
  imports: [CommonModule, SharedModule, ItemListRoutingModule],
  // providers: [ItemsService],
})
export class ItemListModule {}
