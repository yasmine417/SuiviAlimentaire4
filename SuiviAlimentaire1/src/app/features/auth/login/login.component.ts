import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  successMessage = '';
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {
    // Validation
    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    console.log('Tentative de connexion avec:', { email: this.email });

    this.authService.login({
      email: this.email,
      password: this.password
    }).subscribe({
      next: (response) => {
        console.log('Réponse complète:', response);

        // Récupérer le token depuis le header
        const tokenFromHeader = response.headers.get('Authorization');

        // Ou depuis le body
        const tokenFromBody = response.body?.token;

        const token = tokenFromHeader || (tokenFromBody ? 'Bearer ' + tokenFromBody : null);

        console.log('Token reçu:', token);

        if (token) {
          this.authService.saveToken(token);
          this.successMessage = 'Connexion réussie ✅';
          this.errorMessage = '';
          this.isLoading = false;

          setTimeout(() => {
            this.router.navigate(['/aliments']);
          }, 1000);
        } else {
          this.errorMessage = 'Token introuvable dans la réponse';
          this.successMessage = '';
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error('Erreur de connexion:', err);
        this.errorMessage = err.error?.message || err.error || 'Erreur de connexion';
        this.successMessage = '';
        this.isLoading = false;
      }
    });
  }
}
