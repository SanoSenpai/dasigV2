import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { LanguageService } from './shared/services/language/language.service';
import { LanguageData } from './shared/services/language/language.interface';
import { Subscription } from 'rxjs';
import { SpinnerService } from './shared/services/spinner/spinner.service';
import { MobileViewService } from './shared/services/mobile-view/mobile-view.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  currentLanguage!: LanguageData;
  sub!: Subscription;
  showSpinner!: boolean;
  showNavMenu = false;
  isNavbarScrolled: boolean = false;
  currentSection: string = 'home';
  sections!: Element[];
  isMobileView: boolean = false;
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // If the section is in view, set it as the current section
          this.currentSection = entry.target.id;
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    }
  );

  constructor(
    private _lang: LanguageService,
    private _spinner: SpinnerService,
    private _mobileView: MobileViewService,
    private _elementRef: ElementRef
  ) {
    _lang.currentLanguage = 'en-ph';
    this._spinner.showSpinner(true);
    this._mobileView.checkScreenWidth();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.isNavbarScrolled = window.scrollY > 0;
    if (!this.sections) {
      // Get all sections
      this.sections =
        this._elementRef.nativeElement.querySelectorAll('.section');
    }
    // Observe each section
    this.sections.forEach((section: Element) => {
      this.observer.observe(section);
    });
  }

  // Listen to window resize events to toggle nav links and bars visibility
  @HostListener('window:resize', ['$event'])
  onResize() {
    this._mobileView.checkScreenWidth();
    this.isMobileView = this._mobileView.isMobileView;
  }

  ngOnInit(): void {
    this.showSpinner = this._spinner.visibility;
    this.isMobileView = this._mobileView.isMobileView;
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
  }

  onEventClickMenu(message: string): void {
    this.showNavMenu = message === 'true';
  }
}
