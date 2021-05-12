import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private messagesSubject = new BehaviorSubject<string[]>([]);
  public messages$ = this.messagesSubject
    .asObservable()
    .pipe(filter((messages) => messages?.length > 0));

  constructor(private readonly snackBar: MatSnackBar) {}

  public addMessages(...messages: string[]): void {
    this.messagesSubject.next(messages);
  }

  public showToast(
    message: string,
    action = 'Close',
    config?: MatSnackBarConfig
  ) {
    this.snackBar.open(message, action, config || { duration: 5000 });
  }
}
