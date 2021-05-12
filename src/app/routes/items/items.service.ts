import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../shared/services/notifications.service';
import { Item } from './models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  public items$ = this.itemsSubject.asObservable();

  private supabase: SupabaseClient;
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  constructor(private notificationsService: NotificationsService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    this.getAllItems();
  }

  private async getAllItems(): Promise<void> {
    const { data, error } = await this.supabase.from<Item>('items').select('*');

    if (error) {
      this.notify('Unable to load items');
      return;
    }

    this.itemsSubject.next(data);
  }

  public async addItem(item: Item): Promise<void> {
    item.user_id = this.supabase.auth.user().id;
    const { data, error } = await this.supabase
      .from<Item>('items')
      .insert(item)
      .single();

    if (error) {
      this.notify('Unable to add item');
      return;
    }

    const items = this.itemsSubject.getValue();
    items.push(data);
    this.itemsSubject.next(items);
    this.notify('Item added');
    return;
  }

  public async updateItem(id: string, item: Item): Promise<void> {
    const { data, error } = await this.supabase
      .from<Item>('items')
      .update(item)
      .match({ id })
      .single();

    if (error) {
      this.notify('Unable to update item');
      return;
    }

    const items = this.itemsSubject.getValue();
    const index = items.findIndex((item) => item.id === id);
    items[index] = data;

    this.itemsSubject.next(items);
    this.notify('Item updated');
    return;
  }

  public async deleteItem(id: string): Promise<void> {
    const { data, error } = await this.supabase
      .from<Item>('items')
      .delete()
      .match({ id });

    if (error) {
      this.notify('Unable to delete item');
      return;
    }

    const currentItems = this.itemsSubject.getValue();
    const newItems = currentItems.filter((item) => item.id !== id);

    this.itemsSubject.next(newItems);
    this.notify('Item deleted');
    return;
  }

  private notify(message: string): void {
    this.notificationsService.showToast(message);
  }
}
