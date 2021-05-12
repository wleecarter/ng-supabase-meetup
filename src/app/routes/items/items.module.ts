import { NgxFileDropModule } from 'ngx-file-drop';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { AddEditItemComponent } from './add-edit-item/add-edit-item.component';
import { ItemComponent } from './item/item.component';
import { ItemListComponent } from './items-list.component';
import { ItemListRoutingModule } from './items-routing.module';

@NgModule({
  declarations: [AddEditItemComponent, ItemListComponent, ItemComponent],
  imports: [
    CommonModule,
    NgxFileDropModule,
    SharedModule,
    ItemListRoutingModule,
  ],
})
export class ItemListModule {}
