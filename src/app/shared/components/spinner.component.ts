import { Component, Input } from '@angular/core';

@Component({
  selector: `dasig-spinner`,
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css',
})
export class SpinnerComponent {
  @Input() visibility = false;
}
