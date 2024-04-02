import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LanguageData } from '../../services/language/language.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: `dasig-nav-modal`,
  templateUrl: './nav-modal.component.html',
  styleUrl: './nav-modal.component.css',
})
export class NavModalComponent {
  @Input() visibility = true;
  @Input() currentSection: string = 'home';
  @Input() showNavMenu: boolean = false;
  @Input() currentLanguage!: LanguageData;
  @Output() showNavMenuEvent: EventEmitter<string> = new EventEmitter<string>();
  sub!: Subscription;

  scrollToSection(options: {
    sectionId: string;
    scrollBlockType?: ScrollLogicalPosition;
  }): void {
    const { sectionId, scrollBlockType } = options;
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: scrollBlockType ?? 'center',
      });
    }
  }

  onClickNavMenu(): void {
    this.showNavMenu = !this.showNavMenu;
    this.showNavMenuEvent.emit(`${this.showNavMenu}`);
  }
}
