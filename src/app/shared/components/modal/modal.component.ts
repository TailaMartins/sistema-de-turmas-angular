import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Output } from '@angular/core';

import { MaterialModule } from '../../material.module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Modal } from '../../../core/interface/interface';


@Component({
  selector: 'app-modal',
  imports: [MaterialModule, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalComponent {
  @Output() actionBotaoDireito = new EventEmitter();
  @Output() actionBotaoEsquerdo = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Modal
  ) {}

  clickBotaoEsquerdo() {
    this.dialogRef.close();
    this.actionBotaoEsquerdo.emit();
  }

  clickBotaoDireito() {
    this.dialogRef.close();
    this.actionBotaoDireito.emit();
  }
}
