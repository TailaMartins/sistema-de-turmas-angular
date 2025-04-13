import { Component, inject, OnInit } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, CommonModule,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent implements OnInit{
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  isLoggedIn$!: Observable<any>

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isAdminLoggedIn$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  redirectTo(){
    this.router.navigate(['/login']);
  }
}
