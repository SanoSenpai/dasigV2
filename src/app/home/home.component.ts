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
