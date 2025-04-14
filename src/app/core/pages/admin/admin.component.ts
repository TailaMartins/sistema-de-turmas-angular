import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { QRCodeComponent } from 'angularx-qrcode';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

import { MaterialModule } from '../../../shared/material.module';
import { TurmaService } from '../services/turma.service';
import { editorConfig, selecaoTurmas } from '../../interface/editorConfig';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { Turma } from '../../interface/interface';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    QuillModule,
    QRCodeComponent,
    MaterialModule,
    ButtonComponent,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  private readonly formbuilder = inject(FormBuilder);
  private readonly service = inject(TurmaService);
  private readonly dialog = inject(MatDialog);
  private readonly alertService = inject(AlertService)

  readonly selecaoTurma = selecaoTurmas;
  readonly editorConfig = editorConfig;

  form!: FormGroup;
  turmas$!: Observable<any[]>;
  isEdit = false;

  ngOnInit() {
    this.initializeForm();
    this.selecaoTurma.sort();
    this.turmas$ = this.service.getTurmas();
  }

  private initializeForm() {
    this.form = this.formbuilder.group({
      turmas: ['', Validators.required],
      texto: ['', Validators.required],
    });
  }

  openModal() {
    if (this.form.invalid) return;
    const statusMessages: any = {
      true: 'Editar',
      false: 'Adicionar',
      undefined: 'Adicionar'
    };

    const isEdit = this.isEdit;
    const message = statusMessages[isEdit.toString()] || statusMessages['undefined'];

    const dialog = this.dialog.open(ModalComponent, {
      width: '500px',
      height: '250px',
      data: {
        title: `Deseja ${message} este texto agora ?`,
        text: 'Ao confirmar, o texto ficará disponível para os alunos da turmas.',
        botaoDireito: `${message} texto`,
        botaoEsquerdo: 'Cancelar',
      },
    });

    dialog.componentInstance.actionBotaoDireito.subscribe(() => {
      this.salvarTexto();
    });
  }

  salvarTexto() {
    const { turmas, texto } = this.form.value;

    if (turmas && texto) {
      turmas.forEach((turmaId: string) => {
        this.service.adicionarTexto(turmaId, texto);
      });
      this.alertService.success('Texto Adicionado com sucesso!');
      this.form.reset();
    }
  }

  editarTexto(turma: Turma) {
    this.form.patchValue({
      turmas: [turma.id],
      texto: turma.texto,
    });

    this.isEdit = true;
  }

  removerTexto(turma: Turma) {
    this.service.removerTexto(turma.id).then(() => {
      this.alertService.success('Texto apagado com sucesso!');
    });
  }

  resetForm() {
    this.form.reset();
    this.isEdit = false;
  }

  getQRCodeUrl(turmaId: string): string {
    return `${window.location.origin}/turma/${turmaId}`;
  }


  baixarQRCode(turmaId: string) {
    const canvas = document.getElementById(`qrcode-${turmaId}`)?.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `qrcode-turma-${turmaId}.png`;
      link.click();
    }
  }

}
