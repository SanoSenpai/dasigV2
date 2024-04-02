import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageData } from '../../services/language/language.interface';

@Component({
  selector: `dasig-donate-modal`,
  templateUrl: './donate-modal.component.html',
  styleUrl: './donate-modal.component.css',
})
export class DonateModalComponent {
  @Input() visibility!: boolean;
  @Input() showDonateModal!: boolean;
  @Input() currentLanguage!: LanguageData;
  @Output() showDonateModalEvent: EventEmitter<string> =
    new EventEmitter<string>();

  onClickNavMenu(): void {
    this.showDonateModal = !this.showDonateModal;
    this.showDonateModalEvent.emit(`${this.showDonateModal}`);
  }
}
