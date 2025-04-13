import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

import { MaterialModule } from '../../../shared/material.module';
import { TurmaService } from '../services/turma.service';
import { catchError, of, take } from 'rxjs';
import { AlertService } from '../../../shared/services/alert.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-turma',
  imports: [MaterialModule, CommonModule, ButtonComponent],
  templateUrl: './turma.component.html',
  styleUrl: './turma.component.scss',
})
export class TurmaComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TurmaService);
  private readonly alertService = inject(AlertService);

  textoDaTurma!: string;
  turmaId!: string | null;

  ngOnInit() {
    this.getTurmaId();
    this.getTextoDaTurma();
  }

  private getTurmaId() {
    this.turmaId = this.route.snapshot.paramMap.get('id');
  }

  private getTextoDaTurma() {
    if (!this.turmaId) return;

    this.service
      .getTextoTurma(this.turmaId)
      .pipe(
        take(1),
        catchError((error) => {
          this.alertService.error(
            error || 'Algo deu errado por favor tente novamente!'
          );
          return of('');
        })
      )
      .subscribe((texto) => {
        this.textoDaTurma = texto;
      });
  }

  baixarTextoPng() {
    const elemento = document.getElementById(`texto-${this.turmaId}`);
    if (!elemento) return;

    html2canvas(elemento).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `texto-turma-${this.turmaId}.png`;
      link.click();
    });
  }

  baixarPdf() {
    const elemento = document.getElementById(`texto-${this.turmaId}`);
    if (!elemento) return;

    const opt = {
      margin: 10,
      filename: `texto-turma-${this.turmaId}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf().from(elemento).set(opt).save();
  }
}
