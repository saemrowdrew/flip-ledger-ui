import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../service/auth';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-auth-login',
  imports: [FormsModule],
  templateUrl: './auth-login.html',
  styleUrl: './auth-login.css',
})
export class AuthLogin {
  email = signal('');
  password = signal('');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async signInWithEmail() {
    const { error } = await this.authService.signInWithEmail({
      email: this.email(),
      password: this.password()
    });
    if (error) {
      alert('Error signing in: ' + error.message);
    } else {
      this.router.navigate(['/profile'])
    }
  }

  navigateToSignUp() {
    this.router.navigate(['/signup'])
  }

  navigateToInvAdd() {
    this.router.navigate(['/inventory-add'])
  }

}
