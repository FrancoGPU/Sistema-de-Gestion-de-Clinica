import {
  Injectable,
  Renderer2,
  RendererFactory2,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private prefersDarkScheme?: MediaQueryList;

  constructor(
    rendererFactory: RendererFactory2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);

    if (isPlatformBrowser(this.platformId)) {
      this.prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      this.initializeTheme();
      this.listenToSystemThemeChanges();
    }
  }

  private initializeTheme(): void {
    const savedTheme =
      (this.getSavedTheme() as 'light' | 'dark' | 'auto') || 'auto';
    this.applyTheme(savedTheme);

    // Animación de entrada suave
    setTimeout(() => {
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.opacity = '1';
      }
    }, 100);
  }

  applyTheme(theme: 'light' | 'dark' | 'auto'): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = document.body;
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const themeIcon = document.querySelector('.theme-icon');
    const themeText = document.querySelector('.theme-text');
    
    // También aplicar a secciones principales
    const sections = document.querySelectorAll('section, .hero-section, .carousel-info-section, .services-section, .stats-section, .why-choose-section');

    if (theme === 'light') {
      this.setLightTheme(body, header, footer, themeIcon, themeText);
      sections.forEach(section => {
        section.classList.remove('bg-dark', 'text-light');
      });
    } else if (theme === 'dark') {
      this.setDarkTheme(body, header, footer, themeIcon, themeText);
      sections.forEach(section => {
        section.classList.add('bg-dark', 'text-light');
      });
    } else if (theme === 'auto') {
      if (this.prefersDarkScheme?.matches) {
        this.setDarkTheme(body, header, footer, themeIcon, themeText);
        sections.forEach(section => {
          section.classList.add('bg-dark', 'text-light');
        });
      } else {
        this.setLightTheme(body, header, footer, themeIcon, themeText);
        sections.forEach(section => {
          section.classList.remove('bg-dark', 'text-light');
        });
      }
      if (themeIcon) themeIcon.className = 'fas fa-adjust theme-icon';
      if (themeText) themeText.textContent = 'Auto';
    }

    this.saveTheme(theme);
  }

  setTheme(theme: 'light' | 'dark' | 'auto'): void {
    this.applyTheme(theme);
  }

  private setLightTheme(
    body: HTMLElement,
    header: Element | null,
    footer: Element | null,
    themeIcon: Element | null,
    themeText: Element | null
  ): void {
    body.classList.remove('bg-dark', 'text-light');
    body.classList.add('bg-light', 'text-dark');

    if (header) {
      header.classList.remove('header-dark');
      header.classList.add('header-light');
    }

    if (footer) {
      footer.classList.remove('footer-dark');
      footer.classList.add('footer-light');
    }

    if (themeIcon) themeIcon.className = 'fas fa-sun theme-icon';
    if (themeText) themeText.textContent = 'Claro';
  }

  private setDarkTheme(
    body: HTMLElement,
    header: Element | null,
    footer: Element | null,
    themeIcon: Element | null,
    themeText: Element | null
  ): void {
    body.classList.remove('bg-light', 'text-dark');
    body.classList.add('bg-dark', 'text-light');

    if (header) {
      header.classList.remove('header-light');
      header.classList.add('header-dark');
    }

    if (footer) {
      footer.classList.remove('footer-light');
      footer.classList.add('footer-dark');
    }

    if (themeIcon) themeIcon.className = 'fas fa-moon theme-icon';
    if (themeText) themeText.textContent = 'Oscuro';
  }

  private listenToSystemThemeChanges(): void {
    if (this.prefersDarkScheme) {
      this.prefersDarkScheme.addEventListener('change', () => {
        const currentTheme = this.getSavedTheme();
        if (currentTheme === 'auto') {
          this.applyTheme('auto');
        }
      });
    }
  }

  private saveTheme(theme: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }

  private getSavedTheme(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('theme');
    }
    return null;
  }

  setupThemeListeners(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach((option) => {
      option.addEventListener('click', (e: Event) => {
        e.preventDefault();
        const theme = (option as HTMLElement).getAttribute('data-theme') as
          | 'light'
          | 'dark'
          | 'auto';
        if (theme) {
          this.applyTheme(theme);
        }
      });
    });
  }
}
