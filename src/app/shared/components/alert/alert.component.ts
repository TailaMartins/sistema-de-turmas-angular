import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-alert',
  imports: [MatIconModule, MatSnackBarModule, CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: { message: string; type: 'success' | 'error' }
  ) {}
}
