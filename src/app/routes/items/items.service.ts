import { BehaviorSubject, defer, EMPTY, from, merge, Observable, of } from 'rxjs';
import { catchError, filter, first, map, tap } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';
import { NotificationsService } from '../../shared/services/notifications.service';
import { Item } from './models/item.model';

const ITEMS_TABLE = 'items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private supabase: SupabaseClient;
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;
  private itemChangesSubject = new BehaviorSubject<Item[]>([]);
  private allItems$ = defer(() =>
    from(this.getItems()).pipe(map((items) => items))
  );

  public items$ = merge(this.allItems$, this.itemChangesSubject.asObservable());

  constructor(private notificationsService: NotificationsService) {
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  public addItem(item: Item): void {
    try {
      item.user_id = this.supabase.auth.user().id;
      this.supabase
        .from<Item>(ITEMS_TABLE)
        .insert(item)
        .single()
        .then((res) => {
          if (res.error) {
            this.notify('Unable to load items');
            return;
          }
          const items = this.itemChangesSubject.getValue();
          items.push(res.data);
          this.itemChangesSubject.next(items);
          this.notify('Item added');
        });
    } catch (error) {
      this.notify('Unable to load items');
    }
  }

  public updateItem(id: string, item: Item): void {
    try {
      this.supabase
        .from<Item>(ITEMS_TABLE)
        .update(item)
        .match({ id })
        .single()
        .then((res) => {
          if (res.error) {
            this.notify('Unable to update item');
            return;
          }

          const items = this.itemChangesSubject.getValue();
          const index = items.findIndex((item) => item.id === id);
          items[index] = res.data;

          this.itemChangesSubject.next(items);
          this.notify('Item updated');
        });
    } catch (error) {
      this.notify('Unable to load items');
      this.itemChangesSubject.next([]);
    }
  }

  public deleteItem(id: string): void {
    try {
      this.supabase
        .from<Item>(ITEMS_TABLE)
        .delete()
        .match({ id })
        .then((res) => {
          if (res.error) {
            this.notify('Unable to delete item');
            return;
          }

          const currentItems = this.itemChangesSubject.getValue();
          const newItems = currentItems.filter((item) => item.id !== id);

          this.itemChangesSubject.next(newItems);
          this.notify('Item deleted');
        });
    } catch (error) {
      this.notify('Unable to load items');
      this.itemChangesSubject.next([]);
    }
  }

  public clearItems(): void {
    this.itemChangesSubject.next([]);
  }

  private async getItems(): Promise<Item[]> {
    const { data } = await this.supabase.from<Item>(ITEMS_TABLE).select('*');
    this.itemChangesSubject.next(data);
    return data;
  }

  private notify(message: string): void {
    this.notificationsService.showToast(message);
  }
}
