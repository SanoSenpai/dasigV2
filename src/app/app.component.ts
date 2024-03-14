import { Component, OnDestroy, OnInit } from '@angular/core';
import { LanguageService } from './shared/services/language.service';
import { LanguageData } from './shared/services/language.interface';
import { Subscription } from 'rxjs';
import { SpinnerService } from './shared/services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'DASIG';
  currentLanguage!: LanguageData;
  sub!: Subscription;
  showSpinner!: boolean;

  constructor(
    private _lang: LanguageService,
    private _spinner: SpinnerService
  ) {
    _lang.currentLanguage = 'en-ph';
    this._spinner.showSpinner(true);
  }

  ngOnInit(): void {
    this.showSpinner = this._spinner.visibility;
    this.sub = this._lang.getLanguage().subscribe({
      next: (data) => {
        this.currentLanguage = data;
      },
    });
    this.sub = this._spinner.visibilityChanged.subscribe(
      (visibility: boolean) => {
        setTimeout(() => {
          this.showSpinner = visibility;
        }, 0);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
