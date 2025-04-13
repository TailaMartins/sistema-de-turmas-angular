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
  @Input() text!: string;
  @Input() outline!: boolean;
  @Input() disabled!: boolean;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';


}
