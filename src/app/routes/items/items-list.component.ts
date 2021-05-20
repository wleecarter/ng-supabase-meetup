import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { AddEditItemComponent } from './add-edit-item/add-edit-item.component';
import { ItemsService } from './items.service';
import { AddEditDialogData } from './models/add-edit-dialog-data.model';
import { Item } from './models/item.model';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss'],
})
export class ItemListComponent {
  public items$ = this.itemsService.items$;

  constructor(public dialog: MatDialog, private itemsService: ItemsService) {}

  public openDialog(): void {
    const dialogData: AddEditDialogData = {
      item: null,
    };
    this.dialog.open(AddEditItemComponent, {
      width: '40%',
      data: dialogData,
    });
  }
}
