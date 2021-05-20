import { BehaviorSubject } from 'rxjs';

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ItemsService } from '../items.service';
import { AddEditDialogData } from '../models/add-edit-dialog-data.model';
import { Item } from '../models/item.model';

const VALID_IMAGE_IDS = [
  102, 106, 113, 115, 120, 124, 152, 148, 159, 1001, 1002, 1003, 1004, 1005,
  1011, 115, 1016, 1018, 1018, 1027, 1032, 1033, 1041, 1042, 1043, 1044, 1051,
  1056, 1057, 1059, 1060, 1069, 1073, 1083,
];

@Component({
  selector: 'app-add-edit-item',
  templateUrl: './add-edit-item.component.html',
  styleUrls: ['./add-edit-item.component.scss'],
})
export class AddEditItemComponent implements OnInit {
  public form: FormGroup;
  public isEditMode: boolean;
  private item: Item;
  private imageSubject = new BehaviorSubject<string>('');
  public imageSrc$ = this.imageSubject.asObservable();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddEditDialogData,
    public dialogRef: MatDialogRef<AddEditItemComponent>,
    private itemsService: ItemsService,
    private fb: FormBuilder
  ) {
    this.item = this.data.item;
    this.isEditMode = this.item?.id ? true : false;
  }

  public ngOnInit(): void {
    this.formInit();
  }

  public save(): void {
    if (this.isEditMode) {
      this.itemsService.updateItem(this.item.id, this.form.value);
    } else {
      this.itemsService.addItem(this.form.value);
    }
    this.dialogRef.close();
  }

  private formInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      details: '',
      imageUrl: this.getRandomImageUrl(),
    });
    if (this.item) {
      this.form.patchValue(this.item);
      this.imageSubject.next(this.item.imageUrl);
    }
    this.form.valueChanges.subscribe((change) => {
      if (change.imageUrl) {
        this.imageSubject.next(change.imageUrl);
      }
    });
  }

  private getRandomImageUrl(): string {
    const randomIndex = Math.floor(Math.random() * VALID_IMAGE_IDS.length);
    const id = VALID_IMAGE_IDS[randomIndex];
    return `https://picsum.photos/id/${id}/400/250`;
  }
}
