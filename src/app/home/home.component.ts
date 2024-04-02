import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageData } from '../shared/services/language/language.interface';
import { LanguageService } from '../shared/services/language/language.service';
import { SpinnerService } from '../shared/services/spinner/spinner.service';
import { IFAQs } from './home.interface';
import { MobileViewService } from '../shared/services/mobile-view/mobile-view.service';

@Component({
  selector: 'dasig-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './css/home.component.css',
    './css/home.component.links.css',
    './css/home.component.text.css',
    './css/home.component.team.css',
    './css/home.component.faqs.css',
    './css/home.component.contact.css',
  ],
})
export class HomeComponent implements OnInit, OnDestroy {
  currentLanguage!: LanguageData;
  sub!: Subscription;
  collapsingItems!: IFAQs[];
  isMobileView: boolean = false;
  showDonateModal = false;

  constructor(
    private _lang: LanguageService,
    private _spinner: SpinnerService,
    private _mobileView: MobileViewService
  ) {
    _lang.currentLanguage = 'en-ph';
    this._mobileView.checkScreenWidth();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this._mobileView.checkScreenWidth();
    this.isMobileView = this._mobileView.isMobileView;
  }

  ngOnInit(): void {
    this.isMobileView = this._mobileView.isMobileView;
    this.sub = this._lang.getLanguage().subscribe({
      next: (data) => {
        this.currentLanguage = data;
        this.collapsingItems = this.currentLanguage.home.faqsSection.faqs;
      },
      complete: () => {
        setTimeout(() => {
          this._spinner.showSpinner(false);
        }, 100);
      },
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  toggleCollapse(index: number) {
    for (const items in this.collapsingItems) {
      if (Number(items) !== index) {
        this.collapsingItems[items].isCollapsed = true;
      } else {
        this.collapsingItems[index].isCollapsed =
          !this.collapsingItems[index].isCollapsed;
      }
    }
  }

  getCollapseHeight(index: number): string {
    const element = document.getElementById('question_' + index);
    if (element) {
      return `${element.scrollHeight}px`; // Return the scroll height of the element
    }
    return '82px'; // Return 0 if element is not found
  }

  onClickDonateModal(): void {
    this.showDonateModal = !this.showDonateModal;
  }

  onEventDonateModal(message: string): void {
    this.showDonateModal = message === 'true';
  }
}
