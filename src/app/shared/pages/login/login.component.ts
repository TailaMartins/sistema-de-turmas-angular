import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from '../../../auth/auth.service';
import { MaterialModule } from '../../material.module';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly alertService = inject(AlertService);

  async login() {
    try {
      const { isAdmin, email } = await this.authService.loginWithGoogle();

      if (isAdmin) {
        this.router.navigate(['/admin']);
      } else {
        this.alertService.error(`Acesso negado para ${email}`);
        await this.authService.logout();
      }
    } catch (error: any) {
      this.alertService.error(error.message || 'Erro ao fazer login');
    }
  }
}
