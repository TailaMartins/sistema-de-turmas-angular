import { CommonModule } from '@angular/common';
import { Component, HostBinding, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  standalone: true,
  imports: [MatButtonModule, CommonModule],
})
export class ButtonComponent {
  @Input({ required: true }) text!: string;
  @Input() disabled!: boolean;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() layout: 'outline' | 'default' = 'default';
  @Input() color!: 'warn' | 'error';
}
