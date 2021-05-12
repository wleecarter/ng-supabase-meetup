import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './routes/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(
    private readonly authService: AuthService,
    private router: Router
  ) {}

  public async logout(): Promise<void> {
    await this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
