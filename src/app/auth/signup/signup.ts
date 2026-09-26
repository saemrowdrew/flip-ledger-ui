import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  name = signal('');
  email = signal('');
  password = signal('');

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async signup() {
    const { error } = await this.authService.signUpWithEmail({
      name: this.name(),
      email: this.email(),
      password: this.password()
    });
    if (error) {
      alert('Error signing up: ' + error.message)
    } else {
      alert('Check your email to confirm your account');
      this.router.navigate(['/login'])
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
