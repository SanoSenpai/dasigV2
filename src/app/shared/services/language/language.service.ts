import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LanguageData } from './language.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _currentLanguage!: string;
  private _languageData!: LanguageData;

  get language(): LanguageData {
    return this._languageData;
  }

  set currentLanguage(language: string) {
    this._currentLanguage = language ?? 'en-ph';
  }

  constructor(private http: HttpClient) {}

  getLanguage(): Observable<LanguageData> {
    return this.http
      .get<LanguageData>(`./assets/lang/${this._currentLanguage}.json`)
      .pipe(
        tap((data) => {
          this._languageData = data;
        })
      );
  }
}
