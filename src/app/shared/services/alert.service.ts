import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '../components/alert/alert.component';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string) {
    this.openSnackbar(message, 'success');
  }

  error(message: string) {
    this.openSnackbar(message, 'error');
  }

  private openSnackbar(message: string, type: string) {
    this.snackBar.openFromComponent(AlertComponent, {
      data: { message, type },
      duration: 3000,
    });
  }
}
