import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
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
  currentLanguage!: LanguageData;
  sub!: Subscription;
  showSpinner!: boolean;
  isNavbarScrolled: boolean = false;
  currentSection: string = 'home';
  sections!: Element[];
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
    private elementRef: ElementRef
  ) {
    _lang.currentLanguage = 'en-ph';
    this._spinner.showSpinner(true);
  }

  /*
   * Check if the user has scrolled down by checking the vertical scroll position
   */
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    /*
     * Used for Navbar behavior (scroll)
     */
    this.isNavbarScrolled = window.scrollY > 0;

    /*
     * Check if the user has scrolled down by checking the vertical scroll position
     * Used for Navlinks behavior
     */
    if (!this.sections) {
      // Get all sections
      this.sections =
        this.elementRef.nativeElement.querySelectorAll('.section');
    }
    // Observe each section
    this.sections.forEach((section: Element) => {
      this.observer.observe(section);
    });
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
}
