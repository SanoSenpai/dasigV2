import { HostListener, Injectable, Input } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MobileViewService {
  private _isMobileView: boolean = false;

  get isMobileView(): boolean {
    this.checkScreenWidth();
    return this._isMobileView;
  }
  // Function to check screen width and toggle nav links visibility
  checkScreenWidth() {
    this._isMobileView = window.innerWidth < 768; // Adjust breakpoint as needed
  }
}
