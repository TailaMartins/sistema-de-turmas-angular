import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { MaterialModule } from '../../material.module';
import { ModalData } from './modal';
import { ButtonComponent } from "../button/button.component";


@Component({
  selector: 'app-modal',
  imports: [MaterialModule, CommonModule, ButtonComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() actionBotaoDireito = new EventEmitter();
  @Output() actionBotaoEsquerdo = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData
  ) {}

  clickBotaoEsquerdo() {
    this.dialogRef.close();
    this.actionBotaoEsquerdo.emit();
  }

  clickBotaoDireito() {
    this.dialogRef.close();
    this.actionBotaoDireito.emit();
  }

  getIcon(): string{
    const icon ={
      error: 'cancel',
      warn: 'report'
    }

    return icon[this.data.type]
  }
}
