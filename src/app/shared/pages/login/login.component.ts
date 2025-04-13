import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry, MatIconModule } from '@angular/material/icon';

import { AuthService } from '../../../auth/auth.service';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);


  async login() {
    try {
      const { isAdmin, email } = await this.authService.loginWithGoogle();

      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.snackBar.open(`Acesso negado para ${email}`, 'Fechar', {
          duration: 3000,
        });
        await this.authService.logout();
      }
    } catch (error: any) {
      this.snackBar.open(error.message || 'Erro ao fazer login', 'Fechar', {
        duration: 3000,
      });
    }
  }
}
