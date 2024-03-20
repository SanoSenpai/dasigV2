import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageData } from '../shared/services/language.interface';
import { LanguageService } from '../shared/services/language.service';
import { SpinnerService } from '../shared/services/spinner.service';

@Component({
  selector: 'dasig-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css',
    './home.component.links.css',
    './home.component.text.css',
    './home.component.team.css',
    './home.component.faqs.css',
  ],
})
export class HomeComponent {
  pageTitle = 'Home';

  currentLanguage!: LanguageData;
  sub!: Subscription;
  constructor(
    private _lang: LanguageService,
    private _spinner: SpinnerService
  ) {
    _lang.currentLanguage = 'en-ph';
  }

  collapsingItems = [
    {
      question: 'Is this a non-profit organization?',
      answer: 'Yes, all proceeds go towards charity.',
      isCollapsed: true,
    },
    {
      question: 'I am near Bato Leyte, can I opt to meet for donation?',
      answer: `If you opt to donate in-kind and you are near Bato Leyte, kindly drop it at the said locations:\n\n P. Burgos St. Brgy. Bagongbayan Bato, Leyte (in front of Bright Star Child Information Center)\n Contact Person: John Christopher Sulla (09176393542)\n\n Jose Rizal St. Brgy. Tinago, Bato, Leyte (in front of Bato School of Fisheries, adjacent to Axil Graphics)\n Contact Person: Trisha Suzanne Aguilar (09178780661)`,
      isCollapsed: true,
    },
  ];

  toggleCollapse(index: number) {
    this.collapsingItems[index].isCollapsed =
      !this.collapsingItems[index].isCollapsed;
  }

  ngOnInit(): void {
    this.sub = this._lang.getLanguage().subscribe({
      next: (data) => {
        this.currentLanguage = data;
      },
    });
    this._spinner.showSpinner(false);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
