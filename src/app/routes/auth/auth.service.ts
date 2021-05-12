import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { environment } from '../../../environments/environment';

const AUTH_KEY = 'supabase.auth.token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatus: BehaviorSubject<boolean>;
  public isAuthenticated$: Observable<boolean>;

  private supabase: SupabaseClient;
  private supabaseUrl = environment.supabaseUrl;
  private supabaseKey = environment.supabaseKey;

  constructor() {
    const tokenExists = localStorage.getItem(AUTH_KEY) ? true : false;
    this.authStatus = new BehaviorSubject<boolean>(tokenExists);
    this.isAuthenticated$ = this.authStatus.asObservable();
    this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
  }

  public getToken(): string {
    return localStorage.getItem(AUTH_KEY);
  }

  public get isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  public async register(email: string, password: string): Promise<void> {
    try {
      const { user, session, error } = await this.supabase.auth.signUp({
        email,
        password,
      });
      this.authStatus.next(true);
    } catch (error) {
      this.authStatus.next(false);
    }
  }

  public async login(email: string, password: string): Promise<void> {
    try {
      const { user, session, error } = await this.supabase.auth.signIn({
        email,
        password,
      });
      this.authStatus.next(true);
    } catch (error) {
      this.authStatus.next(false);
    }
  }

  public async logout(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    this.authStatus.next(false);
  }
}
