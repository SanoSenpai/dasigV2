import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { LanguageData } from './language.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage!: string;
  _language!: LanguageData;

  get language(): LanguageData {
    return this._language;
  }

  set language(language: string) {
    this.currentLanguage = language;
  }

  constructor(private http: HttpClient) {}

  getLanguage(): Observable<LanguageData> {
    if (this.currentLanguage === 'en-ph') {
      return this.http.get<LanguageData>('./assets/lang/en-ph.json').pipe(
        tap((data) => {
          this._language = data;
        })
      );
    } else {
      return this.http.get<LanguageData>('./assets/lang/en-ph.json').pipe(
        tap((data) => {
          this._language = data;
        })
      );
    }
  }
}
