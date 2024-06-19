import { Injectable, Input } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  @Input() private _visibility = false;
  visibilityChanged: Subject<boolean> = new Subject<boolean>();

  get visibility(): boolean {
    return this._visibility;
  }

  showSpinner(value: boolean) {
    this._visibility = value;
    this.visibilityChanged.next(value);
  }
}
