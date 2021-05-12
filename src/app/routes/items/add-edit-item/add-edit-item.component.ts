import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ItemsService } from '../items.service';
import { AddEditDialogData } from '../models/add-edit-dialog-data.model';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss'],
})
export class AddEditItemComponent implements OnInit {
  public form: FormGroup;
  public item: Item;
  public pageTitle: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogData,
    public dialogRef: MatDialogRef<AddEditItemComponent>,
    private itemsService: ItemsService,
    private fb: FormBuilder
  ) {
    this.item = this.data.item;
    this.pageTitle = this.data.isEditMode ? 'Edit Item' : 'Add New Item';
  }

  public ngOnInit(): void {
    const random = Math.floor(Math.random() * 1000);
    this.form = this.fb.group({
      title: ['', Validators.required],
      details: [''],
      imageUrl: [`https://picsum.photos/id/${random}/400/250`],
    });
    if (this.item) {
      this.form.patchValue(this.item);
    }
  }

  public save(): void {
    this.itemsService.addItem(this.form.value);
    this.dialogRef.close();
  }

  public update(): void {
    this.itemsService.updateItem(this.item.id, this.form.value);
    this.dialogRef.close();
  }
}
