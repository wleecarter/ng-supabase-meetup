import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { AddEditItemComponent } from '../add-edit-item/add-edit-item.component';
import { ItemsService } from '../items.service';
import { AddEditDialogData } from '../models/add-edit-dialog-data.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input('item') item: Item;

  constructor(public dialog: MatDialog, private itemsService: ItemsService) {}

  public edit(): void {
    const dialogData: AddEditDialogData = {
      isEditMode: true,
      item: this.item,
    };
    this.dialog.open(AddEditItemComponent, {
      width: '40%',
      data: dialogData,
    });
  }

  public delete(): void {
    this.itemsService.deleteItem(this.item.id);
  }
}
