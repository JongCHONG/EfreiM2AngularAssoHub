import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: string = 'button';
  @Input() label: string = '';
  @Input() class: string = 'btn btn-primary w-100';
  @Input() disabled: boolean = false;
}