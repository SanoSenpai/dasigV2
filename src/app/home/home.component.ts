import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageData } from '../shared/services/language.interface';
import { LanguageService } from '../shared/services/language.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { IFAQs } from './home.interface';

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

  constructor(
    private _lang: LanguageService,
    private _spinner: SpinnerService
  ) {
    _lang.currentLanguage = 'en-ph';
  }

  ngOnInit(): void {
    this.sub = this._lang.getLanguage().subscribe({
      next: (data) => {
        this.currentLanguage = data;
        this.collapsingItems = this.currentLanguage.home.faqsSection.faqs;
      },
      complete: () => {
        setTimeout(() => {
          this._spinner.showSpinner(false);
        }, 1000);
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
}
