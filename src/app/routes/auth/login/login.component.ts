import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NotificationsService } from '../../../shared/services';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public formGroup: FormGroup;
  public emailControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  public passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  constructor(
    private readonly authService: AuthService,
    private readonly notificationsService: NotificationsService,
    private readonly router: Router,
    private readonly fb: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.formGroup = this.fb.group({
      email: this.emailControl,
      password: this.passwordControl,
    });
  }

  public async onLogin(): Promise<void> {
    const { email, password } = this.formGroup.value;
    await this.authService.login(email, password);
    this.notificationsService.showToast(
      'Congratulations! You are now logged in.'
    );
    this.router.navigateByUrl('/');
  }
}
