import { Injectable, signal, inject, computed } from '@angular/core';
import { createClient, SupabaseClient, Session } from '@supabase/supabase-js';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SignupPayload, LoginPayload } from '../types/user-types';



@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router); 
  private supabase: SupabaseClient;
  public currentUserSession = signal<Session | null>(null);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Auth event triggered ${event}`)
      this.currentUserSession.set(session); 
    })
  }

  async signInWithEmail(payload: LoginPayload) {
    return await this.supabase.auth.signInWithPassword({
      email: payload.email,
      password: payload.password
    });
  }

  async signUpWithEmail(payload: SignupPayload) {
    return await this.supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          user_name: payload.name
        },
      },
    });
  }

  async getUser() {
    return await this.supabase.auth.getUser(); 
  }

  async signOut() {
    return await this.supabase.auth.signOut(); 
  }

  async getCurrentSession(): Promise<Session | null> {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Error fetching your session', error.message)
      return null
    }
    return data.session; 
  }    
}
